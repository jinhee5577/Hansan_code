 /*eslint-disable*/ 
 import React, { useEffect, useState, useRef, } from 'react';
 import fleet from "./aesset/navy.png";
 import zara_head from "./aesset/zara_head.png"; 
 import waves from './aesset/waves.mp4';
 import './App.css';


 function Navy(props){     
    let [F_navy, setF_navy] = useState([]); 
    let [F_navy2, setF_navy2] = useState([{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]},{ nema : "오진희", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]} ,{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]}]);   
    let sectionRef = useRef();
    let [textON, settextON] = useState('');
    let [show_sub, setshow_sub] = useState(false);
    // let [offsetY, SEToffsetY] = useState(0);
    let secSHIP = [{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]},{ nema : "오진희", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]} ,{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]}];
    let [lee_ship, setlee_ship] = useState([ { nema : "이억기", weapon : [1, 2]},{ nema : "오진희", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]} ,{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]} ]);
    let [won_ship, setwon_ship] = useState([ { nema : "원균", weapon : [1, 2]},{ nema : "오진희", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]} ,{ nema : "이억기", weapon : [1, 2]},{ nema : "이억기", weapon : [1, 2]}]);
    

    useEffect(() => {     
      if(props.show_navy){    
        //  console.log(props.show_navy);   
          setTimeout(() => {
            let copy_navy = [...F_navy2, ...secSHIP];
            setF_navy2(copy_navy);          
          }, 1300);
          
          setTimeout(() => {
            settextON('t1');
          }, 2200);
      }             

    }, [props.show_navy]);     
    

    let tactics = () => {   
        let fleets = document.querySelectorAll('.fleet');       
        let PI = Math.PI;
        fleets.forEach((ele) => {
          ele.classList.add("jin");
        });
      //   console.log(sectionRef.current);
       

        setTimeout(() => {       
           fleets.forEach((item, i) => { 
           //  console.log(i);
             if(i < 7){
               fleets[i].style.transform = `translate(0, ${i*5 + 20}px) translateY(35px)`;
             } else {
               fleets[i].style.transform = `translate(0, ${(82 - i*5)}px) translateY(35px)`;
             }
            //  item.animate([
            //   {transform: 'translateY(-4px)'},
            //   {transform: 'translateY(4px)'}
            //  ], {        
            //   duration: 1000,
            //   iterations: Infinity
            // });             
           });           
         
        }, 1000);

        setTimeout(() => {          
          setshow_sub(true);  // 양쪽배 보임.
          setTimeout(() => {
             settextON('t2')
             setTimeout(() => { launch(); }, 1500);  
          }, 1800);     
        }, 2300);                   
    };

    let launch = () => {          
        for(let i = 0; i < 2; i++){
          let wea = document.querySelectorAll(`.w${i+1}`);
          let wea2 = document.querySelectorAll(`.w${i+3}`);
          if(i == 0){ // 1번째대포              
        //    console.log(wea2);
              wea.forEach((w) => { w.classList.add('fire'); });
              wea2.forEach((w) => { w.classList.add('fire2'); });
          }
          else{ // 2번째대포
            setTimeout(() => {
              wea.forEach((w) => { w.classList.add('fire'); });
              wea2.forEach((w) => { w.classList.add('fire2'); });
            }, 500);
          }            
        }
    }
    
    
    return(
        <div id="sunsin_navy">
          <div id="zara" className={props.show_navy ? "turtle_ship" : null} onClick={tactics}>
            <img style={{width: '120%', marginTop: '3px', marginLeft: '-3px' }} src={zara_head} alt="거북선머리"/>         
            <p className={textON === 't1' ? 'z_text' : null}>"학익진을 펼쳐라!!.(클릭)"</p> 
            <p className={textON === 't2' ? 'z_text' : null}>"발포하라!!"</p>       
          </div>
          <div id="sub_ship">
            <Lee_navy show_sub={show_sub} lee_ship={lee_ship} Qclass='' />
            <Lee_navy show_sub={show_sub} lee_ship={won_ship} Qclass='won_navy' />            
          </div>          
      
          <section className={props.show_navy ? 'show_navy' : 'sun_navy'} ref={sectionRef}>
            {
                F_navy2.map((item, i) => { 
                    return(
                      <div className={`fleet fleet${i + 1}`} key={i} >
                        <img src={fleet} alt='함대' style={{width : '100%'}}/>  
                        <div className='weapon'>
                          { item.weapon.map((w, i) => { return <h6 className={`w w${i+3}`} key={i}></h6>; }) }  
                        </div>     
                      </div>
                    )
                })
            }
          </section> 
          <video autoPlay={true} muted={true} loop={true} controls={false} style={{width : '470%',}} >
            <source src={waves} type='video/mp4' />
          </video>    
        </div>
    );
 }


 function Lee_navy({show_sub, lee_ship, Qclass}){

    return (
      <div className={`lee_navy ${Qclass} ${show_sub ? 'show_sub' : null}`}>
        {
          lee_ship.map((ship, i) => {
            return (
              <div className="ship" key={i} >
                <img src={fleet} alt='함대' style={{width : '100%'}}/> 
                <div className='weapon'>
                  { ship.weapon.map((w, i) => { return <h6 className={`w w${i+1}`} key={i}></h6>; }) }  
                </div>                                                
              </div>
            );
          })
        }
      </div>
    );
 }


 export default Navy;