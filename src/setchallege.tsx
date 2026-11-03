import { useState, useEffect } from "react";
import type { challenge } from "./challenge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faMedal, faCrown } from "@fortawesome/free-solid-svg-icons";

type Props = {
    challengeList: challenge[];
};

const ChallengeList = ({ challengeList }: Props) => {
    return (
        <div>
            {challengeList.map((challenge) => (
                <div key={challenge.id} className="border-2 border-blue-300 p-4 mb-2 rounded">
                    <h3 className="font-bold">{((challenge.id === 5 || challenge.id === 10 || challenge.id === 15 || challenge.id === 20) && <FontAwesomeIcon icon={faAward} />) || ((challenge.id === 25) && <FontAwesomeIcon icon={faMedal} style={{ color: "gold" }}/>) || ((challenge.id === 30) && <FontAwesomeIcon icon={faCrown} style={{ color: "gold" }} />)} {challenge.title}</h3>
                    <p>{challenge.description}</p>
                    <p>進捗: {challenge.progress} / {challenge.progressComplete}</p>
                    <p>チャレンジ状況: {challenge.isCompleted ? (
                        <span className="text-blue-400 font-bold">完了</span>
                    ) : (
                        <span className="text-red-400 font-bold">未完了</span>
                    )}</p>
                </div>
            ))}
        </div>
    );
};

export default ChallengeList;