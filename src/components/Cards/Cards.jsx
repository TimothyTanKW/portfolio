import { useState } from 'react';

//Icon
import ExternalLinkIcon from "../../assets/externalLinkIcon";

export default function Cards({ data, title, scrollToWork }) {
    const [tag, setTag] = useState(data);
    const [active, setActive] = useState("");

    const filterTag = (event) => {
        if (!active || active != event.currentTarget.getAttribute('value')) {
            setActive(event.currentTarget.getAttribute('value'));
            setTag(data.filter(datas => datas.stack.some(subData => subData === event.currentTarget.getAttribute('value'))));
        } else {
            setActive("");
            setTag(data);
        }
        scrollToWork.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="card-wrapper">
            <div className="scroll" ref={scrollToWork}></div>
            <div className="work-title text-bold">{title[0].title}</div>
            <div className="card-inner inner">
                {tag.map((tags, index) => (
                    <div key={index} className="card">
                        <a className="card-link" href={tags.url} target="_blank">
                            <img src={tags.src} alt={tags.alt} />
                        </a>
                        <div className="spacer-15"></div>
                        <h4><a href={tags.url} target="_blank">{tags.title} <ExternalLinkIcon /></a></h4>
                        <div className="spacer-15"></div>
                        <div className="tag-wrapper">
                            {tags.stack.map((stacks, index) => (
                                <div key={index} className={`tags ${active === stacks ? 'active' : ''}`} onClick={(event) => filterTag(event)}  value={stacks}>
                                    {stacks}
                                </div>
                            ))}
                        </div>
                        <div className="spacer-15"></div>
                        <p>{tags.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
