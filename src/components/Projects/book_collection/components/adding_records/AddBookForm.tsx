// React and Standard Hooks
import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
// Apollo Client
import { useMutation } from '@apollo/client';
import { ADD_BOOK, UPDATE_BOOK } from '../../../../../GraphQL/mutations';
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Custom Hooks and Utilities
import { useQueries } from '../../utility/hooks/useQueries';
import {
	regexValidator,
	checkIsbn,
	processSelectionData,
} from '../../utility/handlers';
import { numbersRegex } from '../../utility/regex';
import { Flags } from '../../utility/enums';
import { loadEditableData } from '../../utility/handlers/loadEditableData';
// General Purpose Components
import Select from '../general-purpose/Select';
import SuccessMessage from '../general-purpose/SuccessMessage';
import Button from '../general-purpose/Button';
import FileInput from '../general-purpose/FileInput';
// Other Components
import LoadingSpinner from '../../../../LoadingSpinner';
import CustomError from '../../../../CustomError';
// External Libraries
import axios from 'axios';
import { imageApi } from '../../../../../server';

export interface AddBookFormProps {
	epubData?: {
		title: string;
		authors: string[] | null;
		genres: string[] | null;
		publisher: { id: string; name: string } | null;
		description: string;
		isbn: string;
		language: string;
		cover: string;
		localId: string;
	};
	flag: Flags;
}
export interface AddBookFormRef {
	refetchFunction: () => void;
}

enum Language {
	Polish = 'Polish',
	English = 'English',
}
const AddBookForm = forwardRef<AddBookFormRef, AddBookFormProps>(
	(props, ref) => {
		const location = useLocation();
		const navigate = useNavigate();

		// FETCHING DATA
		const { epubData, flag } = props;
		const editableData = location.state;
		const { data, errors, loading, refetch } = useQueries();

		// Extract uploaded data if available
		const uploadedAuthors = epubData?.authors;
		const uploadedGenres = epubData?.genres;
		// const uploadedDescription = epubData?.description;
		const uploadedPublisher = epubData?.publisher;
		const uploadedTitle = epubData?.title;
		const uploadedLanguage = epubData?.language;
		const uploadedCover = epubData?.cover;
		const uploadedIsbn = epubData?.isbn;

		// CONTROL STATES
		const [authorsSelectCounter, setAuthorsSelectCounter] = useState([0]);
		const [genresSelectCounter, setGenresSelectCounter] = useState([0]);
		const [translatorsSelectCounter, setTranslatorsSelectCounter] = useState([
			0,
		]);
		const [bookSeriesSelectCounter, setBookSeriesSelectCounter] = useState([
			0,
		]);
		const [inBookSeries, setInBookSeries] = useState(
			editableData?.bookSeries ? true : false
		);
		const [duplicationError, setDuplicationError] = useState(false);
		const [successMessage, setSuccessMessage] = useState('');
		const [userError, setUserError] = useState('');

		// FORM VALUES
		const [title, setTitle] = useState(
			uploadedTitle || editableData?.title || ''
		);
		const [titleEnglish, setTitleEnglish] = useState(
			editableData?.titleEnglish || ''
		);
		const [titleOriginal, setTitleOriginal] = useState(
			editableData?.titleOriginal || ''
		);
		const [language, setLanguage] = useState(
			uploadedLanguage || editableData?.language || 'Polish'
		);
		const [genres, setGenres] = useState<string[]>([]);
		const [publisher, setPublisher] = useState(
			uploadedPublisher || editableData?.publisher || ''
		);
		const [translators, setTranslators] = useState<string[]>([]);
		const [authors, setAuthors] = useState<string[]>([]);
		const [bookSeries, setBookSeries] = useState<string[]>([]);
		const [tomes, setTomes] = useState<string[]>([]);
		const [cover, setCover] = useState<File | null>();
		const [isbn, setIsbn] = useState(
			uploadedIsbn || editableData?.isbn || ''
		);
		const [pages, setPages] = useState(editableData?.pages || '');
		const [firstEdition, setFirstEdition] = useState(
			editableData?.firstEdition || ''
		);

		// Refetch function exposed to parent components via ref
		useImperativeHandle(ref, () => ({
			refetchFunction: () => refetch(),
		}));
		// Load initial uploaded data when component mounts
		useEffect(() => {
			if (uploadedAuthors)
				loadEditableData(
					uploadedAuthors,
					setAuthors,
					setAuthorsSelectCounter
				);
			if (uploadedGenres)
				loadEditableData(uploadedGenres, setGenres, setGenresSelectCounter);
			if (editableData && !loading) {
				loadEditableData(
					editableData.authors,
					setAuthors,
					setAuthorsSelectCounter
				);
				loadEditableData(
					editableData.bookGenres,
					setGenres,
					setGenresSelectCounter
				);
				loadEditableData(
					editableData.translators,
					setTranslators,
					setTranslatorsSelectCounter
				);
			}
		}, [uploadedAuthors, uploadedGenres, editableData, loading]);
		// Mutation for adding a book
		const [addBook, { loading: mutationLoading, error: mutationError }] =
			useMutation(ADD_BOOK, {
				onCompleted(data) {
					afterCompletion(data);
				},
			});
		// Mutation for updating a book
		const [updateBook] = useMutation(UPDATE_BOOK, {
			onCompleted(data) {
				const linkRedirect = location.pathname.slice(0, 33);
				navigate(linkRedirect, {
					state: { id: editableData.id, refetch: true },
				});
			},
		});
		// Function to upload cover image after adding/updating a book
		const uploadCover = (bookId: string, localId?: string) => {
			if (epubData?.cover) {
				const data = {
					bookId: bookId,
					localId: localId,
				};

				axios
					.post(`${imageApi}/uploaded/covers-epub`, data, {
						headers: {
							'Content-Type': 'application/json',
						},
					})
					.then(({ status, data }) => {
						if (status === 200) {
							setCover(null);
						}
					})
					.catch(error => {
						console.error('There was an error!', error);
					});
			}
			if (cover) {
				axios
					.post(
						`${imageApi}/uploaded/covers`,
						{
							file: cover,
							id: bookId,
						},
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					)
					.then(({ status, data }) => {
						if (status === 200) {
							setCover(null);
						}
					})
					.catch(error => {
						console.error('There was an error:', error);
					});
			}
		};
		// Handle actions after successfully completing a mutation
		const afterCompletion = (data: any) => {
			if (data.addBook.userErrors[0].message) {
				setUserError(data.addBook.userErrors[0].message);
			}
			if (data.addBook.book) {
				const bookId = data.addBook.book.id;
				uploadCover(bookId, epubData?.localId);
				resetForm();
				setSuccessMessage(data.addBook.book.title);
				setTimeout(() => {
					setSuccessMessage('');
					const linkRedirect = `${location.pathname.slice(
						0,
						17
					)}books/${bookId.slice(-10)}`;
					navigate(linkRedirect, {
						state: { id: bookId, refetch: false },
					});
				}, 3000);
			}
		};
		const resetForm = () => {
			setInBookSeries(false);
			setAuthorsSelectCounter([0]);
			setBookSeriesSelectCounter([0]);
			setGenresSelectCounter([0]);
			setTranslatorsSelectCounter([0]);
			setTitle('');
			setTitleEnglish('');
			setTitleOriginal('');
			setLanguage('Polish');
			setGenres([]);
			setTranslators([]);
			setAuthors([]);
			setBookSeries([]);
			setPublisher('');
			setIsbn('');
			setPages('');
			setFirstEdition('');
		};
		// HANDLE EVENTS
		const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
			const { value, id } = e.target;
			switch (id) {
				case 'pages':
					regexValidator(numbersRegex, value, setPages);
					break;
				case 'isbn':
					setIsbn(value);
					if (value.length >= 10) checkIsbn(e);
					break;
				case 'firstEdition':
					regexValidator(numbersRegex, value, setFirstEdition);
					break;
				default:
					break;
			}
		};
		const handleTomeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			if (value.length === 0) {
				setTomes(['']);
			} else {
				processSelectionData(
					e,
					tomes,
					setTomes,
					bookSeriesSelectCounter,
					setDuplicationError
				);
			}
		};

		const handleCoverUpload = (files: FileList) => {
			if (!files.length) return;
			const validExtensions = ['.jpg', '.jpeg', '.png'];
			const validSizeLimitMB = 7;
			const validSizeInBytes = validSizeLimitMB * Math.pow(1024, 2);

			const coverFile = files[0];
			// Check file extension validity
			if (!validExtensions.some(ext => coverFile.name.endsWith(ext))) {
				alert(
					`Invalid file type. Allowed types are ${validExtensions.join(
						', '
					)}`
				);
				return;
			}
			if (coverFile.size > validSizeInBytes) {
				alert(`File size exceeds ${validSizeLimitMB}MB limit.`);
				return;
			}
			// Set cover file state if all checks pass
			setCover(coverFile);
		};
		// Handle book submission with validation checks before mutation calls
		const handleBookSubmit = () => {
			if (!pages || isNaN(Number(pages))) {
				setUserError('Pages are wrong');
				return;
			}
			const variables = {
				authors,
				bookGenres: genres ? genres : null,
				bookSeries,
				firstEdition: firstEdition ? Number(firstEdition) : null,
				isbn,
				language,
				pages: pages ? Number(pages) : null,
				publisher: publisher.id || publisher,
				title,
				titleEnglish,
				titleOriginal,
				translators: translators ? translators : null,
			};

			if (flag === Flags.Add) {
				addBook({
					variables,
				});
			}
			if (flag === Flags.Edit) {
				updateBook({
					variables: { ...variables, ...{ id: editableData.id } },
				});
				uploadCover(editableData.id);
			}
		};
		// RENDER ELEMENTS
		const showForm = () => {
			return (
				<form className='bookCollection__addBook__bookForm__form addBookForm'>
					<div className='addBookForm_element addBookForm_element_cover'>
						<img
							src={uploadedCover}
							alt=''
						/>
					</div>
					{/* Title Input */}
					<div className='addBookForm_element addBookForm_element_title'>
						<label htmlFor='title'>title</label>
						<input
							value={title}
							id='title'
							type='text'
							autoComplete='off'
							required
							onChange={e => setTitle(e.target.value)}
						/>
					</div>
					{/* English Title Input */}
					<div className='addBookForm_element addBookForm_element_title'>
						<label htmlFor='titleEnglish'>English title</label>
						<input
							value={titleEnglish}
							id='titleEnglish'
							type='text'
							autoComplete='off'
							onChange={e => setTitleEnglish(e.target.value)}
						/>
					</div>
					{/* Original Title Input */}
					<div className='addBookForm_element addBookForm_element_title'>
						<label htmlFor='titleOriginal'>Original title</label>
						<input
							value={titleOriginal}
							id='titleOriginal'
							type='text'
							autoComplete='off'
							required
							onChange={e => setTitleOriginal(e.target.value)}
						/>
					</div>
					{/* Pages Input */}
					<div className='addBookForm_element addBookForm_element_pages'>
						<label htmlFor='pages'>pages</label>
						<input
							autoComplete='off'
							id='pages'
							type='text'
							value={pages}
							min={10}
							max={2000}
							step={1}
							onChange={e => handleInputs(e)}
						/>
					</div>
					{/* ISBN Input */}
					<div className='addBookForm_element addBookForm_element_isbn'>
						<label htmlFor='isbn'>isbn</label>
						<input
							name='isbn'
							autoComplete='off'
							id='isbn'
							type='text'
							value={isbn}
							onChange={e => handleInputs(e)}
						/>
					</div>
					{/* First Edition Input */}
					<div className='addBookForm_element addBookForm_element_firstEdition'>
						<label htmlFor='firstEdition'>first edition</label>
						<input
							autoComplete='off'
							type='text'
							id='firstEdition'
							value={firstEdition}
							onChange={e => handleInputs(e)}
						/>
					</div>
					{/* Language Selection */}
					<div className='addBookForm_element addBookForm_element_language'>
						<label htmlFor='language'>language</label>
						<select
							id='language'
							name='language'
							onChange={e => setLanguage(e.target.value)}>
							<option value={Language.Polish}>{Language.Polish}</option>
							<option value={Language.English}>
								{Language.English}
							</option>
						</select>
					</div>
					{/* Publisher Selection */}
					<div className='addBookForm_element addBookForm_element_publisher'>
						<label htmlFor='publisher'>publisher</label>
						<select
							className='form_select'
							id='publishers'
							name='publishers'
							onChange={e => setPublisher(e.target.value)}>
							<option value={publisher.id}>
								{publisher.name || '-- find me --'}
							</option>
							{data.publishers.map(
								(publisher: { id: string; name: string }) => {
									return (
										<option
											key={publisher.id}
											value={publisher.id}
											label={publisher.name}></option>
									);
								}
							)}
						</select>
					</div>
					{/* Genre Selection */}
					<div className='addBookForm_element addBookForm_element_genres'>
						{genresSelectCounter.map(input => {
							return (
								<Select
									item='genre'
									id={input}
									key={input}
									data={data.genres}
									selectedValues={genres}
									selectCounter={genresSelectCounter}
									setSelectCounter={setGenresSelectCounter}
									setSelectedValues={setGenres}
									setDuplicationError={setDuplicationError}
								/>
							);
						})}
					</div>
					{/* Author Selection */}
					<div className='addBookForm_element addBookForm_element_authors'>
						{authorsSelectCounter.map(input => {
							return (
								<Select
									item='author'
									id={input}
									key={input}
									data={data.authors}
									selectedValues={authors}
									selectCounter={authorsSelectCounter}
									setSelectCounter={setAuthorsSelectCounter}
									setSelectedValues={setAuthors}
									setDuplicationError={setDuplicationError}
								/>
							);
						})}
					</div>
					{/* Translators Selection */}
					{language === Language.Polish && title !== titleOriginal && (
						<div className='addBookForm_element addBookForm_element_translators'>
							{translatorsSelectCounter.map(input => {
								return (
									<Select
										item='translator'
										id={input}
										key={input}
										data={data.translators}
										selectedValues={translators}
										selectCounter={translatorsSelectCounter}
										setSelectCounter={setTranslatorsSelectCounter}
										setSelectedValues={setTranslators}
										setDuplicationError={setDuplicationError}
									/>
								);
							})}
						</div>
					)}
					{/* Book Series Radio Buttons */}
					<div className='addBookForm_element addBookForm_element_isBookSeries'>
						<label htmlFor='in_bookSeries'>Part of a book series?</label>
						<label
							htmlFor='yes'
							className='form-control-radio'>
							<input
								type='radio'
								name='in_bookSeries'
								id='yes'
								onClick={() => setInBookSeries(true)}
							/>
							Yes
						</label>
						<label
							htmlFor='no'
							className='form-control-radio'>
							<input
								type='radio'
								name='in_bookSeries'
								id='no'
								onClick={() => setInBookSeries(false)}
							/>
							No
						</label>
					</div>
					{inBookSeries && (
						<div className='addBookForm_element addBookForm_element_bookSeries'>
							{bookSeriesSelectCounter.map(index => {
								return (
									<React.Fragment key={index}>
										<Select
											item='book series'
											id={index}
											data={data.bookSeries}
											selectedValues={bookSeries}
											selectCounter={bookSeriesSelectCounter}
											setSelectCounter={setBookSeriesSelectCounter}
											setSelectedValues={setBookSeries}
											setDuplicationError={setDuplicationError}
										/>
										<label htmlFor='tome'>tome</label>
										<input
											autoComplete='off'
											type='text'
											name='tome'
											id={`${index}`}
											value={tomes[index] || ''}
											onChange={e => handleTomeInput(e)}
										/>
									</React.Fragment>
								);
							})}
						</div>
					)}
					{/* Cover upload section */}
					<div className='addBookForm_element addBookForm_element_cover-upload'>
						<label htmlFor='cover'>upload cover</label>
						<FileInput
							id='cover'
							coverLink={editableData?.cover}
							fileList={cover ? [cover] : []}
							onChange={handleCoverUpload}
							parentClass='addBookForm_element_cover-upload'
						/>
					</div>
					<Button
						handleClick={handleBookSubmit}
						text='submit'
						className=''
					/>
				</form>
			);
		};
		// Handle error display
		const showErrors = () => {
			if (mutationError) return <CustomError text={mutationError.message} />;
			if (userError) return <CustomError text={userError} />;
			if (duplicationError)
				return (
					<CustomError text='Duplication error(s) detected, correct mistakes before continuing' />
				);
			if (errors) return <CustomError text={errors} />;
		};

		return (
			<div className='bookCollection__addBook__bookForm'>
				{(loading || mutationLoading) && <LoadingSpinner />}
				{showErrors()}
				{successMessage ? (
					<SuccessMessage
						item='book'
						successMessage={successMessage}
					/>
				) : null}
				{data && !loading && !successMessage && showForm()}
			</div>
		);
	}
);

export default AddBookForm;
