import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie'

import { useTheme } from '@mui/material';
import axios from 'axios';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const Pie = () => {

    const [piedata, setPiedata] = useState();



    useEffect(() => {
        axios.get('http://127.0.0.1:3702/order/productpie')
            .then(response => {
                setPiedata(response.data)
            })
            .catch(error => {
                console.error(error);
            });


    }, []);
    console.log(piedata)

    const fillColors = piedata?.map(item => ({
        match: { id: item.id },
        id: 'lines'
      }))


    if (piedata) {
        return (
            <ResponsivePie
                theme={{
                    //調圓餅中與延伸的字
                    "fontSize": 22,
                    axis: {
                        domain: {
                            line: {
                                stroke: "#777777"
                            }
                        },
                        legend: {
                            text: {
                                "fontSize": 72,
                                fill: "#777777"
                            }
                        },
                        ticks: {
                            line: {
                                stroke: "#777777",
                                strokeWidth: 1
                            },
                            text: {
                                fontSize: 72,
                                fill: "#777777"
                            }
                        }
                    },
                    legends: {
                        text: {
                            fontSize: 18,
                            fill: "#777777"
                        }
                    },
                    tooltip: {
                        container: {
                            background: "#ffffff",
                            color: "#777777",
                            fontSize: 18,
                        },
                    }
                }}
                data={piedata}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                fontSize={36}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#ffffff"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={fillColors}
                // legends={[
                //     {
                //         anchor: 'bottom',
                //         fontSize: 36,
                //         direction: 'row',
                //         justify: false,
                //         translateX: 0,
                //         translateY: 56,
                //         itemsSpacing: 0,
                //         itemWidth: 100,
                //         itemHeight: 18,
                //         itemTextColor: '#999',
                //         itemDirection: 'left-to-right',
                //         itemOpacity: 1,
                //         symbolSize: 18,
                //         symbolShape: 'circle',
                //         effects: [
                //             {
                //                 on: 'hover',
                //                 style: {
                //                     itemTextColor: '#000',

                //                 }
                //             }
                //         ]
                //     }
                // ]}
            />
        )
    } else {
        return <div>Loading...</div>;
    }



}

export default Pie;