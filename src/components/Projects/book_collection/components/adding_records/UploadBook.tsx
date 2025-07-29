import { useState, useEffect, useRef, useCallback } from 'react';
import AddAuthor from './AddAuthorForm';
import AddBookForm, { AddBookFormProps, AddBookFormRef } from './AddBookForm';
import AddGenre from './AddGenreForm';
import AddPublisherForm from './AddPublisherForm';
import UploadBookForm from './UploadBookForm';
import { Flags } from '../../utility/enums';
import Button from '../general-purpose/Button';

type Author = {
	firstName: string;
	secondName: string;
	thirdName: string;
	lastName: string;
};
export interface ParsedDataInterface {
	authors: {
		existing: string[] | null;
		new:
			| {
					firstName: string;
					secondName: string;
					thirdName: string;
					lastName: string;
			  }[]
			| null;
	} | null;
	genres: { existing: string[] | null; new: string[] | null } | null;
	publisher: {
		existing: { id: string; name: string };
		new: string | null;
	} | null;
	title?: string;
	language?: string;
	cover?: string;
	description?: string;
	isbn?: string;
	localId?: string;
}

const UploadBook: React.FC = () => {
	const [parsedData, setParsedData] = useState<ParsedDataInterface>();
	const [updatedData, setUpdatedData] = useState<{
		title: string;
		authors: string[] | null;
		genres: string[] | null;
		publisher: {
			id: string;
			name: string;
		} | null;
		description: string;
		language: string;
		cover: string;
		isbn: string;
		localId: string;
	}>();
	const [newAuthors, setNewAuthors] = useState<Array<Author> | null>(null);
	const [authorsAdded, setAuthorsAdded] = useState<Array<string>>([]);

	const [newGenres, setNewGenres] = useState<Array<string> | null>(null);
	const [genresAdded, setGenresAdded] = useState<Array<string>>([]);

	const [newPublisher, setNewPublisher] = useState<string | null>();
	const [publisherAdded, setPublisherAdded] = useState('');

	const childRef = useRef<AddBookFormRef>(null);

	useEffect(() => {
		if (parsedData) {
			if (parsedData.authors?.new && !newAuthors) {
				setNewAuthors(parsedData.authors.new);
			}
			if (parsedData.genres?.new && !newGenres) {
				setNewGenres(parsedData.genres.new);
			}
			if (parsedData.publisher?.new && !newPublisher) {
				setNewPublisher(parsedData.publisher.new);
			}
		}
		/*eslint-disable*/
	}, [parsedData]);
	/*eslint-enable*/
	const updateData = useCallback(() => {
		if (parsedData) {
			const mergedAuthors = () => {
				if (parsedData.authors) {
					if (parsedData.authors.existing) {
						if (authorsAdded.length > 0 && !authorsAdded.includes(' ')) {
							return [...parsedData.authors.existing, ...authorsAdded];
						}
						return parsedData.authors.existing;
					} else {
						if (authorsAdded.length > 0 && !authorsAdded.includes(' ')) {
							return authorsAdded;
						}
					}
				}
				return null;
			};

			const mergedGenres = () => {
				if (parsedData.genres) {
					if (parsedData.genres.existing) {
						if (genresAdded.length > 0 && !genresAdded.includes(' ')) {
							return [...parsedData.genres.existing, ...genresAdded];
						}
						return parsedData.genres.existing;
					} else {
						if (genresAdded.length > 0 && !genresAdded.includes(' ')) {
							return genresAdded;
						}
					}
				}
				return null;
			};
			const mergedPublisher = () => {
				if (parsedData.publisher) {
					if (parsedData.publisher.existing) {
						return parsedData.publisher.existing;
					} else if (parsedData.publisher.new) {
						if (publisherAdded.length > 1) {
							return {
								id: publisherAdded,
								name: parsedData.publisher.new,
							};
						}
					}
				}
				return null;
			};

			const updatedDataObj = {
				title: parsedData.title || '',
				authors: mergedAuthors(),
				genres: mergedGenres(),
				publisher: mergedPublisher(),
				description: parsedData.description || '',
				language: parsedData.language || '',
				cover: parsedData.cover || '',
				isbn: parsedData.isbn || '',
				localId: parsedData.localId || '',
			};

			setUpdatedData(updatedDataObj);
		}
	}, [parsedData, authorsAdded, genresAdded, publisherAdded]);
	useEffect(() => {
		const allAuthorsAdded =
			authorsAdded.length === newAuthors?.length &&
			!authorsAdded.includes(' ');
		const allGenresAdded =
			genresAdded.length === newGenres?.length && !genresAdded.includes(' ');
		const publisherAddedClean = !publisherAdded.includes(' ');

		if (allAuthorsAdded && allGenresAdded && publisherAddedClean) {
			updateData();
			setNewAuthors([]);
			setNewGenres([]);
			setNewPublisher(null);
		}
		if (
			parsedData &&
			!parsedData.authors?.new &&
			!parsedData.genres?.new &&
			!parsedData.publisher?.new
		) {
			updateData();
		}
	}, [
		updateData,
		parsedData,
		authorsAdded,
		genresAdded,
		publisherAdded,
		newAuthors,
		newGenres,
		newPublisher,
	]);

	const showAddAuthor = () => {
		return (
			newAuthors &&
			newAuthors.map(author => {
				return (
					<div
						className='bookCollection__addBook__upload_addAuthor'
						key={author.lastName}>
						<AddAuthor
							className='bookCollection__addBook__upload_addAuthor'
							author={author}
							flag={Flags.Add}
							onAdded={setAuthorsAdded}
						/>
					</div>
				);
			})
		);
	};

	const showAddGenre = () => {
		return (
			newGenres &&
			newGenres.map(genre => {
				return (
					<div
						className='bookCollection__addBook__upload_addGenre'
						key={genre}
						id={genre}>
						<AddGenre
							className='bookCollection__addBook__upload_addGenre'
							genre={genre}
							onAdded={setGenresAdded}
							flag={Flags.Add}
						/>
						<div className='bookCollection__addBook__upload_addGenre-skip'>
							<Button
								className=''
								text='skip'
								handleClick={() => {
									document.getElementById(genre)?.remove();
								}}
							/>
						</div>
					</div>
				);
			})
		);
	};
	const showAddPublisher = () => {
		return (
			newPublisher && (
				<div
					className='bookCollection__addBook__upload_addPublisher'
					key={newPublisher}
					id={newPublisher}>
					<AddPublisherForm
						className='bookCollection__addBook__upload_addPublisher'
						publisher={newPublisher}
						onAdded={setPublisherAdded}
						flag={Flags.Add}
					/>
					<div className='bookCollection__addBook__upload_addPublisher-skip'>
						<Button
							className=''
							text='skip'
							handleClick={() => {
								document.getElementById(newPublisher)?.remove();
							}}
						/>
					</div>
				</div>
			)
		);
	};
	const showAddMissingRecords = () => {
		return (
			(parsedData?.authors?.new ||
				parsedData?.genres?.new ||
				parsedData?.publisher?.new) && (
				<div className='bookCollection__addBook__upload_missing'>
					<p>Add following records to the database before the book</p>
					{parsedData?.authors?.new && (
						<div className='bookCollection__addBook__upload_missing_authors'>
							<p>Add new authors</p>
							{showAddAuthor()}
						</div>
					)}
					{parsedData?.genres?.new && (
						<div className='bookCollection__addBook__upload_missing_genres'>
							<p>Add new genres</p>
							{showAddGenre()}
						</div>
					)}
					{parsedData?.publisher?.new && (
						<div className='bookCollection__addBook__upload_missing_publisher'>
							<p>Add new publisher</p>
							{showAddPublisher()}
						</div>
					)}
					<Button
						className=''
						text='all done'
						handleClick={() => {
							updateData();
							if (childRef.current) {
								childRef.current.refetchFunction();
							}
						}}
					/>
				</div>
			)
		);
	};

	return (
		<div className='bookCollection__addBook__upload'>
			{!parsedData && <UploadBookForm setParsedData={setParsedData} />}
			{showAddMissingRecords()}
			{updatedData && (
				<AddBookForm
					ref={childRef}
					epubData={updatedData}
					flag={Flags.Add}
				/>
			)}
		</div>
	);
};
export default UploadBook;
