import React from 'react'

export default function Rank({ name, entries }) {
    let str = name.slice(" ");
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <div>
            <div className="white f3 center">
                {`${str}, your current entry count is ....`}
            </div>
            <div className="white f1 center">
                {entries}
            </div>
        </div>
    )
}
