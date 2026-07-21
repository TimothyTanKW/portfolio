export default function About({ data, profile, title, scrollToAbout}) {
    return (
        <div className="about-wrapper">
            <div className="scroll" ref={scrollToAbout}></div>
            <div className="work-title text-bold">{title[1].title}</div>
            <div className="about-inner inner">
                <div className='about-img'>
                    <img src={profile} />
                </div>
                {data.map((datas, index) => (
                    <div className="about" key={index}>
                        <h4 className="">{datas.year} <br /><span className="text-bold text-white">{datas.title}</span></h4>
                        <p>{datas.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}