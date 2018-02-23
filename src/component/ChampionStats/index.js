import React from 'react';
import "./ChampionStats.css"


import {Row,Col} from "antd";

import championJson from "../../lolJSON/champion.json"



const championMap={};

for(let champion in championJson.data){
	championMap[championJson.data[champion].key]=championJson.data[champion];
}

console.log(championMap)
const championStats = ({matchList})=>{
	
	// console.log(matchList)

	const heroSatus={};
	matchList.forEach(({ChampionId,Game_W})=>{
		if(!heroSatus[ChampionId]){
			heroSatus[ChampionId]={}

			heroSatus[ChampionId].championId=ChampionId;
			heroSatus[ChampionId].count=1;

			heroSatus[ChampionId].win=Game_W?1:0;
		}else{
			heroSatus[ChampionId].count++;
			if(Game_W){
				heroSatus[ChampionId].win++;
			}			
		}
	})
	
	const heroArr=[]
	for(let key in heroSatus){


		heroSatus[key].winRate = (heroSatus[key].win/heroSatus[key].count).toFixed(3)
		heroArr.push(heroSatus[key])
	}
	console.log("heroArr",heroArr)
	
	const winrateArr=[...heroArr],
		  countArr=[...heroArr];

	winrateArr.sort((pre,next)=>{
		return next.winRate-pre.winRate
	})
	countArr.sort((pre,next)=>{
		return next.count-pre.count
	})
	
	

	return (
		<div className="championStats">
			
			<Row type="flex" justify="center">
				
				<Col xs={24} md={8}>
					<div className="championStats-title">胜率最高</div>

					<ul className="championBox">
						{

							winrateArr.slice(0,3).map(({championId,winRate,count})=>(
								<li className="championItem" key={championId}>
									<div className="champion-icon">
										<img src={`http://ossweb-img.qq.com/images/lol/img/champion/${championMap[championId].id}.png`} alt="championId"/>
									</div>
									<div className="champion-des">
										{ `${count}场${winRate*100}%`}
									</div>	

								</li>
							))
						}
						
					</ul>
				</Col>

				<Col xs={24} md={8}>
					<div className="championStats-title">胜率最低</div>

					<ul className="championBox">
						{

							winrateArr.reverse().slice(0,3).map(({championId,winRate,count})=>(
								<li className="championItem" key={championId}>
									<div className="champion-icon">
										<img src={`http://ossweb-img.qq.com/images/lol/img/champion/${championMap[championId].id}.png`} alt="championId"/>
									</div>
									<div className="champion-des">
										{ `${count}场${winRate*100}%`}
									</div>	

								</li>
							))
						}
						
					</ul>
				</Col>
				<Col xs={24} md={8}>
					<div className="championStats-title">登场最多</div>

					<ul className="championBox">
						{

							countArr.slice(0,3).map(({championId,winRate,count})=>(
								<li className="championItem" key={championId}>
									<div className="champion-icon">
										<img src={`http://ossweb-img.qq.com/images/lol/img/champion/${championMap[championId].id}.png`} alt="championId"/>
									</div>
									<div className="champion-des">
										{ `${count}/${matchList.length}场`}
									</div>	

								</li>
							))
						}
						
					</ul>
				</Col>
			</Row>	


		</div>
	)
}


export default championStats;