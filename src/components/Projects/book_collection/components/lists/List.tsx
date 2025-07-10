import { Link } from 'react-router-dom';
import AZList from './AZ-list';
import { useState } from 'react';
import { imageApi } from '../../../../../server';
import ThumbnailWithFallback from '../general-purpose/ThumbnailWithFallback';
import PageNumbers from './PageNumbers';
import { RecordTypes } from '../../utility/enums';
import { useTranslation } from 'react-i18next';

interface ListProps {
	data: {
		id: string;
		title?: string;
		firstName?: string;
		lastName?: string;
		name?: string;
		namePolish?: string;
		__typename: string;
	}[];
	nested?: boolean;
	pagination?: {
		activePage: number;
		totalPages: number;
		setActivePage: React.Dispatch<React.SetStateAction<number>>;
	};
}
export type RecordValues = {
	id: string;
	title?: string;
	firstName?: string;
	lastName?: string;
	name?: string;
	namePolish?: string;
	__typename: string;
};

const List: React.FC<ListProps> = ({ data, nested, pagination }) => {
	const { i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const [letter, setLetter] = useState('');

	const linkPath = (record: RecordValues) => {
		const pathId = record.id.slice(-10);

		if (!nested) {
			return pathId;
		}
		return `../${record.__typename.toLowerCase()}s/${pathId}`;
	};
	console.log(data);
	const sortData = () => {
		return data.filter(record => {
			if (
				record.title?.charAt(0) === letter.toUpperCase() ||
				record.lastName?.charAt(0) === letter.toUpperCase() ||
				record.name?.charAt(0) === letter.toUpperCase() ||
				record.namePolish?.charAt(0) === letter.toUpperCase()
			) {
				return record;
			} else return false;
		});
	};

	// const checkLocation = () => {
	//   const path = location.pathname;
	//   console.log(path);
	//   if (path.includes('books') || path.includes('authors') || path.includes('publishers')) {
	//     return true;
	//   } else {
	//     return false;
	//   }
	// };

	const showThumbnail = (record: RecordValues, thumbnail: string) => {
		const type = record.__typename;

		if (
			type === RecordTypes.Author ||
			type === RecordTypes.Book ||
			type === RecordTypes.Genre ||
			type === RecordTypes.Publisher ||
			type === RecordTypes.BookSeries ||
			type === RecordTypes.Translator
		) {
			return (
				<ThumbnailWithFallback
					url={thumbnail}
					recordType={type}
				/>
			);
		}
	};

	const handleLongTitles = (title: string, maxLength: number) => {
		if (title.length <= maxLength) return title;
		let shortenedTitle = title.slice(0, maxLength);

		if (shortenedTitle.lastIndexOf(' ') > -1) {
			shortenedTitle = shortenedTitle.slice(
				0,
				shortenedTitle.lastIndexOf(' ')
			);
		}
		return `${shortenedTitle}...`;
	};

	return (
		<>
			{(letter ? sortData() : data).map(record => {
				const thumbnail = `${imageApi}/covers/${record.id}/thumbnail`;
				return (
					<div
						className='bookCollection__list_element'
						key={record.id}>
						<Link
							className='router_link'
							to={linkPath(record) || ''}
							state={{ id: record.id }}>
							{showThumbnail(record, thumbnail)}
							<span>
								{record.title
									? handleLongTitles(record.title, 90)
									: null}
								{record.lastName
									? `${record.lastName} ${record.firstName}`
									: null}
								{record.name
									? currentLanguage === 'pl'
										? record.namePolish
											? record.namePolish?.toLocaleUpperCase()
											: record.name.toLocaleUpperCase()
										: record.name.toLocaleUpperCase()
									: null}
							</span>
						</Link>
					</div>
				);
			})}

			<>
				{pagination && pagination.totalPages > 1 && (
					<PageNumbers
						activePage={pagination.activePage}
						totalPages={pagination.totalPages}
						setActivePage={pagination.setActivePage}
					/>
				)}
				{/* <AZList letter={letter} sort={setLetter} /> */}
			</>
		</>
	);
};

export default List;
