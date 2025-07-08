import { Link } from 'react-router-dom';
import coding_playground from '../../images/coding_playground.jpg';
import book_collection from '../../images/book_collection.jpg';
import learning_japanese from '../../images/learning_japanese.jpg';
import useViewportHeight from './hooks/useViewportHeight';

const PROJECTS_CONTAINER_CLASS = 'scroller__projects_container';

const Projects: React.FC = () => {
	useViewportHeight('scroller__projects');

	return (
		<section className='scroller__projects'>
			<h2>Projects</h2>

			<div className={PROJECTS_CONTAINER_CLASS}>
				<h3>JS coding playground</h3>
				<div>
					<Link to='apps/coding'>
						<img
							src={coding_playground}
							alt='miniature for coding playground project'
						/>
					</Link>
				</div>
				<p>
					Coding playground for React that I wrote based on Udemy course.
					Two types of cells - code and text. Packages are automatically
					installed when you import them. Full interactions between
					separate code windows. Optional autosave.
				</p>
			</div>

			<div className={PROJECTS_CONTAINER_CLASS}>
				<h3>book collection</h3>
				<div>
					<Link to='apps/collection'>
						<img
							src={book_collection}
							alt='miniature for book collection project'
						/>
					</Link>
				</div>
				<p>
					This project is the biggest one until now. Written all by myself
					using TypeScript, GraphQL, Node and React. The goal is to keep my
					book collection organised and to make it easier for my family to
					find a book that they want to read. One cool feature is a
					possibility of uploading ebook file so that my app gets metadata
					and speeds up the whole adding book process.
				</p>
			</div>
			<div className={PROJECTS_CONTAINER_CLASS}>
				<h3>learning japanese</h3>
				<div>
					<Link to='https://kamiljakobczak.github.io/learning-japanese/'>
						<img
							src={learning_japanese}
							alt='miniature for learning japanese project'
						/>
					</Link>
				</div>
				<p>
					This project was built using vanilla JavaScript and follows an
					object-oriented programming (OOP) approach. Why? I wanted to
					create something that fulfills one of the key requirements for a
					potential job opportunity. At the same time, I'm planning a trip
					to Japan and want to learn how to read at least some basic signs
					in Japanese. The project is still a work in progress, but the
					easy and medium difficulty levels are already playable. Player
					data is stored in local storage, so stats persist across
					different sessions and encounters
				</p>
			</div>

			{/* <div className='projects__container'>
        <h3>blog</h3>
        <div>
          <Link to='apps/blog'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div> */}

			{/* <div className='projects__container'>
        <h3>gallery</h3>
        <div>
          <Link to='apps/gallery'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div> */}
		</section>
	);
};

export default Projects;
