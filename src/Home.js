 /*eslint-disable*/ 
 import React, { Component, useEffect, useState, useRef, } from 'react';
 import handoor1 from './aesset/handoor1.png';
 import handoor2 from './aesset/handoor2.png';
 import leesunsin from './aesset/leesunsin.jpg';
 import Navy from "./Navy.js";
 import MovieInfo from './Movie_info.js';
 import './App.css';


 function Home(){
    let doorRef = useRef();
    let [stable, setstable] = useState(false);
    let [mvON, setmvON] = useState(false);
    let [show_navy, setshow_navy] = useState(false);
    let [show_july, setshow_july] = useState(false);
    let [show_actor, setshow_actor] = useState(false);
    let [offsetY, SEToffsetY] = useState(0);
  //  console.log(doorRef.current);

    let scrollEV = () => {
          SEToffsetY(window.pageYOffset);
            //  console.log(offsetY);
          if(offsetY > 250){         
              setmvON(true);
          } if(offsetY > 420){ 
               setshow_navy(true);
            // console.log(show_navy);
          } if(offsetY > 920){
               setshow_july(true);
          } if(offsetY > 1680){
               setshow_actor(true);
          }      
    };  
   
    let haveDday = () => { 
      let Dday = document.querySelector('.dday');
      let openDay = new Date('2022-07-27T00:00:00+0900');
      let now = new Date();
      let dateGap = openDay.getTime() - now.getTime();
  
      let day = Math.floor(dateGap / (1000*60*60*24)); 
      let hours = Math.floor((dateGap % (1000*60*60*24)) / (1000*60*60));
      let minutes = Math.floor((dateGap % (1000*60*60)) / (1000*60));
      let seconds = Math.floor(dateGap % (1000*60) / 1000);
      
      Dday.innerHTML = `${day}<span>일</span> ${hours}<span>시간</span> : ${minutes}<span>분</span> : ${seconds}<span>초</span> 남았습니다.`;
    };

    let countTime = () => { 
        setInterval(haveDday, 1000);
    };
      

    useEffect(() => {  
      let frist = setTimeout(() => {
          doorRef.current.style.opacity = 0;
          setstable(true);
      }, 1700);

      window.addEventListener('scroll',scrollEV);
      countTime();

      return () => {
         clearTimeout(frist);
         window.removeEventListener('scroll',scrollEV);
      }
    }, [offsetY]);   

    useEffect(() => {
      if(show_july){
         let Dday = document.querySelector('.dday');
         setTimeout(() => { 
           Dday.classList.add('sh_july');
         }, 450);
      }
    }, [show_july]);

 
    return(
      <>                 
        <div id="jinwrap">          
            <p className={stable ? 'txdown' : 'year' } style={{color : "white"}}><span>1592年</span> <span>7年</span> <span>8日</span> <span>한산도 앞바다</span></p>
            <article style={{color : 'white'}}>
              임진왜란을 일으킨 일본은 전쟁 초기 기세를 올리며 한반도를 점령해 가자 조선은 나라의 운명이 위태로워졌다. <br/>
              하지만 이때 한반도 남쪽 바다에서 조선수군의 승리 소식이 전해졌다!. 
            </article>
            <div id='back_sunsin'></div>
            <h3 className='captain'>이순신장군 이 이끄는 조선수군은</h3>

            <div className='leesunsin'>
               <div className='sunsin'>
                   <img src={leesunsin} style={{width : '155%'}} alt="이순신장군" />
               </div> 
               <span>남해안에서 일본의 보급선을 끊어라!!.</span>
            </div>  

            <h2 className='arrow'></h2>  

            <section className={mvON ? 'onMV' : "MVhansan"}>
              <iframe width="110%" height="260" src="https://www.youtube.com/embed/FLNUcZxCT6k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </section>

            <Navy show_navy={show_navy} />
            <h2 className={`july ${show_july && 'sh_july'}`} style={{color : 'white'}}>7월 27일 대개봉</h2>
            <h1 className='dday'></h1>
            <MovieInfo show_july={show_july} show_actor={show_actor} />
        </div> 


        <div className='opening' ref={doorRef}>
          <div className='door door1'>
            <img src={handoor1} alt="문"/>
          </div>    
          <div className='door door2'>
            <img src={handoor2} alt="문"/>
          </div>    
        </div> 
      </>  
    );
 }


 export default Home;