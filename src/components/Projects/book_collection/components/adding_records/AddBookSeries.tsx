import { useMutation, useQuery } from '@apollo/client';
import { processSelectionData } from '../../utility/handlers';
import CustomError from '../../../../CustomError';
import React, { useEffect, useState } from 'react';
import {
	ADD_BOOKSERIES,
	UPDATE_BOOKSERIES,
} from '../../../../../GraphQL/mutations';
import { LOAD_BOOKS } from '../../../../../GraphQL/queries';
import Button from '../general-purpose/Button';
import Select from '../general-purpose/Select';

import LoadingSpinner from '../../../../LoadingSpinner';
import SuccessMessage from '../general-purpose/SuccessMessage';
import { numbersRegex } from '../../utility/regex';
import { Flags } from '../../utility/enums';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadEditableData } from '../../utility/handlers/loadEditableData';

interface AddBookSeriesProps {
	className: string;
	flag: Flags;
}

const AddBookSeries: React.FC<AddBookSeriesProps> = ({ className, flag }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const editableData = location.state;

	const [name, setName] = useState(editableData?.name || '');
	// const [addBooks, setAddBooks] = useState(false);
	const [books, setBooks] = useState<string[]>([]);
	const [tomes, setTomes] = useState<string[]>([]);
	const [booksSelectionCounter, setBooksSelectionCounter] = useState([0]);
	const [duplicationError, setDuplicationError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [userError, setUserError] = useState('');
	console.log(editableData);
	useEffect(() => {
		if (
			editableData &&
			editableData.books &&
			Array.isArray(editableData.books)
		) {
			if (editableData.books.length === 0) {
				return;
			} else {
				const newBooksState: string[] = [];
				const newTomesState: string[] = [];
				const newCounterState: number[] = [];
				editableData.books.forEach(
					(element: { bookId: string; tome: string }, index: number) => {
						newBooksState.push(element.bookId);
						newTomesState.push(element.tome);
						newCounterState.push(index);
						console.log(element, index);
					}
				);
				setBooks(newBooksState);
				setTomes(newTomesState);
				setBooksSelectionCounter(newCounterState);
			}
		}
	}, [editableData]);

	const {
		data: dataB,
		error: errorB,
		loading: loadingB,
	} = useQuery(LOAD_BOOKS);

	const [addBookSeries, { data, loading, error }] = useMutation(
		ADD_BOOKSERIES,
		{
			onCompleted(data) {
				onCompletedMutation(data);
			},
		}
	);
	const [updateBookSeries, { data: dataU, loading: loadingU, error: errorU }] =
		useMutation(UPDATE_BOOKSERIES, {
			onCompleted(data) {
				setSuccessMessage('Book series data updated successfully');
				const linkRedirect = location.pathname.slice(0, 35);
				setTimeout(() => {
					setSuccessMessage('');
				}, 3000);
				navigate(linkRedirect, {
					state: { id: editableData.id, refetch: true },
				});
			},
		});

	const onCompletedMutation = (data: any) => {
		setName('');
		setBooks(['']);
		setTomes(['']);
		// setAddBooks(false);
		if (data.addBookSeries.userErrors[0].message) {
			setUserError(data.addBookSeries.userErrors[0].message);
		}
		if (data.addBookSeries.bookSeries) {
			setSuccessMessage(data.addBookSeries.bookSeries.name);

			setBooksSelectionCounter([0]);
			setTimeout(() => {
				setSuccessMessage('');
			}, 3000);
		}
	};

	// HANDLERS

	const handleTomeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (value.match(numbersRegex)) {
			processSelectionData(
				e,
				tomes,
				setTomes,
				booksSelectionCounter,
				setDuplicationError
			);
		} else if (value.length === 0) {
			setTomes(['']);
		}
	};

	const handleSubmit = () => {
		const arr: { tome: string; bookId: string }[] = [];
		for (let i = 0; i < tomes.length; i++) {
			arr.push({
				tome: tomes[i],
				bookId: books[i],
			});
		}

		if (arr[0].bookId === '') {
			setUserError('Book series must have at least one book');
			return;
		} else if (name === '' && name.length < 2) {
			setUserError("Provide a book series' name");
		} else {
			const variables = {
				name,
				booksInBookSeries: arr,
			};
			flag === Flags.Add &&
				addBookSeries({
					variables,
				});
			flag === Flags.Edit &&
				updateBookSeries({
					variables: { ...variables, ...{ id: editableData.id } },
				});
		}
	};

	// RENDER ELEMENTS

	const showForm = () => {
		return (
			<form
				action=''
				className='addBookSeries__form'>
				<h5>new book series</h5>
				<div className='addBookSeries__form_element'>
					<label htmlFor='name'>name</label>
					<input
						type='text'
						id='name'
						autoComplete='off'
						required
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				{/* <div className='addBookSeries__form_element addBooksInput'>
          <label className='addBooksInput_label' htmlFor='books'>
            add books to the collection?
          </label>
          <label className='form-control-radio'>
            <input
              type='radio'
              name='books'
              id='yes'
              onClick={() => setAddBooks(true)}
            />
            yes
          </label>
          <label className='form-control-radio'>
            <input
              type='radio'
              name='books'
              id='no'
              onClick={() => setAddBooks(false)}
            />
            no
          </label>
        </div> */}
				{!loading && showAddBooks()}
				{showErrors()}
				{duplicationError && (
					<CustomError text='Duplication error(s) detected, correct mistakes before continuing' />
				)}
				<Button
					className='addBookSeries__form_button'
					handleClick={handleSubmit}
				/>
			</form>
		);
	};

	const showAddBooks = () => {
		return (
			<div className='addBookSeries__form_element collectionBookList'>
				{booksSelectionCounter.map(selection => {
					return (
						<React.Fragment key={selection}>
							<div>
								<label htmlFor='tome'>tome</label>
								<input
									autoComplete='off'
									type='text'
									name='tome'
									id={`${selection}`}
									value={tomes[selection] || ''}
									onChange={e => handleTomeInput(e)}
								/>
							</div>

							<Select
								item='book'
								id={selection}
								data={dataB.books}
								selectedValues={books}
								inputValues={tomes}
								selectCounter={booksSelectionCounter}
								setSelectCounter={setBooksSelectionCounter}
								setSelectedValues={setBooks}
								setInputValues={setTomes}
								setDuplicationError={setDuplicationError}
							/>
						</React.Fragment>
					);
				})}
			</div>
		);
	};

	const showErrors = () => {
		if (error) {
			return <CustomError text={error.message} />;
		} else if (errorB) {
			return <CustomError text={errorB.message} />;
		} else if (userError) {
			return <CustomError text={userError} />;
		}
	};

	return (
		<div className={`${className} addBookSeries`}>
			{data && successMessage ? (
				<SuccessMessage
					item='book series'
					successMessage={successMessage}
				/>
			) : null}
			{(loading || loadingB) && <LoadingSpinner />}
			{!loading && !loadingB && !successMessage ? showForm() : null}
		</div>
	);
};

export default AddBookSeries;
