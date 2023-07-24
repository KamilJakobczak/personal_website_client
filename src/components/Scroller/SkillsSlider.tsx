import { ReactComponent as CssIcon } from '../../images/skills_slider_icons/50px/css_icon.svg';
import { ReactComponent as GraphQLIcon } from '../../images/skills_slider_icons/50px/graphql_icon.svg';
import { ReactComponent as HTMLIcon } from '../../images/skills_slider_icons/50px/html_icon.svg';
import { ReactComponent as JSIcon } from '../../images/skills_slider_icons/50px/js_icon.svg';
import { ReactComponent as ReactIcon } from '../../images/skills_slider_icons/50px/react_icon.svg';
import { ReactComponent as TSIcon } from '../../images/skills_slider_icons/50px/typescript_icon.svg';
import { ReactComponent as NodeIcon } from '../../images/skills_slider_icons/50px/node_icon.svg';
import { ReactComponent as ApolloIcon } from '../../images/skills_slider_icons/50px/apollo_icon.svg';
import { ReactComponent as ReduxIcon } from '../../images/skills_slider_icons/50px/redux_icon.svg';

const SkillsSlider = () => {
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
  return (
    <div className='scroller__business_slider'>
      {icons.map(icon => {
        return <div key={`${icons.indexOf(icon)}`}>{icon}</div>;
      })}
    </div>
  );
};
export default SkillsSlider;
