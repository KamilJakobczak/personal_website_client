import { ReactComponent as CssIcon } from '../../images/skills_slider_icons/50px/css_icon.svg';
import { ReactComponent as GraphQLIcon } from '../../images/skills_slider_icons/50px/graphql_icon.svg';
import { ReactComponent as HTMLIcon } from '../../images/skills_slider_icons/50px/html_icon.svg';
import { ReactComponent as JSIcon } from '../../images/skills_slider_icons/50px/js_icon.svg';
import { ReactComponent as ReactIcon } from '../../images/skills_slider_icons/50px/react_icon.svg';
import { ReactComponent as TSIcon } from '../../images/skills_slider_icons/50px/typescript_icon.svg';
import { ReactComponent as NodeIcon } from '../../images/skills_slider_icons/50px/node_icon.svg';
import { ReactComponent as ApolloIcon } from '../../images/skills_slider_icons/50px/apollo_icon.svg';
import { ReactComponent as ReduxIcon } from '../../images/skills_slider_icons/50px/redux_icon.svg';
import { useEffect, useState } from 'react';

interface SkillsIconsProps {
	parentClass: string;
}

const SkillsIcons: React.FC<SkillsIconsProps> = ({ parentClass }) => {
	const icons = [
		<ReactIcon />,
		<TSIcon />,
		<GraphQLIcon />,
		<CssIcon />,
		<NodeIcon />,
		<HTMLIcon />,
		<JSIcon />,
		<ApolloIcon />,
		<ReduxIcon />,
	];

	const [iconsArr, setIconsArr] = useState<JSX.Element[]>([]);
	// Fisher-Yates Shuffle
	function shuffleArray(array: JSX.Element[]) {
		const shuffled = [...array]; // Create a copy to avoid mutating original
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	useEffect(() => {
		setIconsArr(shuffleArray(icons));
		const interval = setInterval(() => {
			setIconsArr(shuffleArray(icons));
		}, 30000);
		return () => clearInterval(interval);
	}, []);

	const evenIcons = iconsArr.filter((_, index) => index % 2 === 0);
	const oddIcons = iconsArr.filter((_, index) => index % 2 !== 0);

	return (
		<div className={`${parentClass}-icons`}>
			<div className={`${parentClass}-icons_even`}>
				{evenIcons.map((icon, index) => {
					return <div key={`even-${index}`}>{icon}</div>;
				})}
			</div>
			<div className={`${parentClass}-icons_odd`}>
				{oddIcons.map((icon, index) => {
					return <div key={`odd-${index}`}>{icon}</div>;
				})}
			</div>
		</div>
	);
};
export default SkillsIcons;
