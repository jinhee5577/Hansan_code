 /*eslint-disable*/ 
 import React, { useEffect, useState, useRef, } from 'react';
 import './App.css';
 import axios from "axios"; 
 import sunsin from './aesset/sunsin.jpg';
 import hafu from './aesset/haru.jpg';
 import { actorsImg } from './aesset/img_data.js';
//  axios.defaults.withCredentials = true; // withCredentials 전역 설정


 function MovieInfo( {show_july, show_actor} ){
    let [hansan_movie, Sethansan_movie] = useState({});    
    let [openDT, SetopenDT] = useState('');
    let [genres, Setgenres] = useState('');
    let [Actors, setActors] = useState([]);
    let [Act_info, setAct_info] = useState({});
    let [actIMG, setactIMG] = useState('');
    let [show_actInfo, setshow_actInfo] = useState(false);
    let peopleCd = ["10029474", "20147110", "10043371", "20111125", "20308770", "20127194", "10006228", "20171680", "20179005", "20110896", "10066926"];  //배우들 개별 코드번호

    let featch_hansan = async () => {
        try {
           let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=96972ad419e3d1247b5d7fe574829c32&movieCd=20209343';
           let {data : {movieInfoResult : { movieInfo } }} = await axios.get(url);
           console.log(movieInfo);
           Sethansan_movie(movieInfo);     

          if(movieInfo.openDt){
       //    console.log(movieInfo.openDt)
            let openDt = movieInfo.openDt;
            for(let i = 0; i < 2; i++){
              if(i == 0){
              let text_arr = openDt.split('2022');
              openDt = text_arr.join('2022.');
              } if(i == 1){
              let text_arr = openDt.split('27');
              openDt = text_arr.join('.27');
              }
            }          
            SetopenDT(openDt);         
            Setgenres(movieInfo.genres.map((a) => a.genreNm).join(', '));
            
            let newActors = [...movieInfo.actors];  
            newActors.unshift(movieInfo.directors[0]);
            newActors.forEach((item, i) => { 
                item['img'] = actorsImg[i];   // 배우들 이미지 새로 할당.
            })
            setActors(newActors);           
          } 

        } catch(error){
            console.log(error);
        }    
    }; 

    useEffect(() => {  
        featch_hansan();     
        if(show_july){
          console.log(show_july);
            let im = document.querySelectorAll('.im');
            let hs = document.querySelectorAll('.hs');
            setTimeout(() => {
               im.forEach((a) => { a.classList.add('sh_lee_haru'); });
               setTimeout(() => { hs.forEach((a) => { a.classList.add('show_ref'); }); }, 600);
            }, 900);
        }
    }, [show_july]); 
  
  //  console.log(hansan_movie.companys);

    let index = 0;
    let clickActors = async () => {  // 개별 배우정보 불러오기.    
        try {
          let url = `https://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?key=f5eef3421c602c6cb7ea224104795888&peopleCd=${peopleCd[index - 1]}`;
          let {data : {peopleInfoResult : {peopleInfo} }} = await axios.get(url);
      //  console.log(peopleInfo);
          setAct_info(peopleInfo);
        } catch(error){
            console.log(error);
        }       
    };
 

    return (
      <>
        <div id="hansan_info">
          <h2 className='hs'>{hansan_movie.movieNm}</h2>         
          <div className='m_info hs'>
            <span>
              장르 | {genres} | 한국 | {hansan_movie.showTm}분 | {openDT}개봉
            </span>               
          </div>                      

          <div className='movie_img'>
            <div className='i1 im'>
              <img src={sunsin} alt="이순신" />
            </div>
            <div className='i2 im'>
              <img src={hafu} alt="야스하루"/>
            </div>
          </div>
          
          <aside>
            <h2 className={`intro_ac ${show_actor && 'sh_july'}`}>감독 / 출연</h2>
            <section>
              {
                Actors.map((ac, i) => { 
                  return (
                    <div className={`actor_box actor_box${i+1} ${show_actor && 'sh_act'}`} key={i} 
                     onClick={() => { index = i; setactIMG(ac.img); clickActors(); setTimeout(() => {setshow_actInfo(true);}, 300) }}>
                      <div className='actor'>
                        <img src={ac.img} alt='배우'/>
                      </div>
                      <h3>{ac.peopleNm}</h3>
                      <h3 style={{fontSize : '.82rem', marginTop : '5px', marginBottom : '8px'}} >{ac.peopleNmEn}</h3>
                    </div>
                  );
                })
              }
            </section>              
          </aside>

          <footer>    
            <div className='companys'>
              {
                hansan_movie.companys 
                ? (hansan_movie.companys.map((item, i) => {
                    return (
                      <h3 key={i} className="comp">
                        {i == 0 ? '제작' : `${i == 2 ? '제작/개발' : '제공/배급'}`} : { i < 2 ? item.companyNm : '오진희'}
                      </h3>
                    );  
                  }))
                : null
              }            
            </div>
          </footer>       
        </div>
        { 
          show_actInfo 
          ? (Act_info.peopleNm && <ActorInfo Act_info={Act_info} actIMG={actIMG} setshow_actInfo={setshow_actInfo} />) 
          : null 
        } 
      </>  
    );
 }


 function ActorInfo({ Act_info, actIMG, setshow_actInfo }){
    let [filmos, setfilmos] = useState([]);    
    // useEffect(() => {       
    //   if(Act_info.filmos.length > 21){  // 필모그래피를 20개까지만 짤라준다.
    //     setfilmos(Act_info.filmos.slice(0, 21)); 
    //   } else {
    //       setfilmos(Act_info.filmos);
    //   }  
    //   // return () => { setfilmos([]); }         
    // }, []);
   
    
    return (
      <div id="actor_box">             
        <div className='actor_wrap'>  
          <button onClick={() => {setshow_actInfo(false);}} >X</button>
          <aside>
            <img src={actIMG} alt='배우'/>
          </aside>
          <section>
            <h4>{Act_info.peopleNm} / <span>{Act_info.repRoleNm}</span></h4>
            <h4>필모그래피 <span className='len'>{Act_info.filmos.length > 21 ? Act_info.filmos.length + '개 중 20' : Act_info.filmos.length}개</span></h4>
            <ul>
              {/* {  // 1번째 방법
                filmos.map((item, i) => {
                  return <li key={i}>{item.movieNm}</li>;
                })
              } */}
              {    // 2번째 방법
                Act_info.filmos.length > 21   // 필모그래피를 20개까지만 짤라준다.
                ? (Act_info.filmos.slice(0, 21).map((item, i) => {
                    return <li key={i}>{item.movieNm}</li>;
                  })) 
                : (Act_info.filmos.map((item, i) => {
                    return <li key={i}>{item.movieNm}</li>;
                  }))  
              }           
            </ul>
          </section> 
        </div>        
      </div>
    );     
 }


 export default MovieInfo;