import { ReactComponent as CssIcon } from '../../images/skills_slider_icons/css_icon.svg';
import { ReactComponent as GraphQLIcon } from '../../images/skills_slider_icons/graphql_icon.svg';
import { ReactComponent as HTMLIcon } from '../../images/skills_slider_icons/html_icon.svg';
import { ReactComponent as JSIcon } from '../../images/skills_slider_icons/js_icon.svg';
import { ReactComponent as ReactIcon } from '../../images/skills_slider_icons/react_icon.svg';
import { ReactComponent as TSIcon } from '../../images/skills_slider_icons/typescript_icon.svg';
import { ReactComponent as NodeIcon } from '../../images/skills_slider_icons/node_icon.svg';
import { ReactComponent as ApolloIcon } from '../../images/skills_slider_icons/apollo_icon.svg';
import { ReactComponent as ReduxIcon } from '../../images/skills_slider_icons/redux_icon.svg';

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
        return <div key={''}>{icon}</div>;
      })}
    </div>
  );
};
export default SkillsSlider;
