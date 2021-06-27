import { QuestionProps } from "types/Types";
import 'styles/Question/styles.scss';
import cx from 'classnames';

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps){
  return(
    <div 
      className={cx(
        'question',
        {answered : isAnswered}, 
        {highlighted : isHighlighted && !isAnswered}
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}/>
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}