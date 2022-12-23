import './Controls.css';

function Controls(props: { active: any; }) {
  const active = props.active;

  return (
    <div className="Controls">
      <div className={`up ${active.up}`}>&uArr;</div>
      <div className={`left ${active.left}`}>&lArr;</div>
      <div className={`down ${active.down}`}>&dArr;</div>
      <div className={`right ${active.right}`}>&rArr;</div>
    </div>
  );
}

export default Controls;