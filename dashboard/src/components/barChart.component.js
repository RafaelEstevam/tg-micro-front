import {
    Axis, Chart, getTheme, registerTheme, Tooltip, Interval, Legend, registerShape
} from 'bizcharts';
import { COLORS } from '../styles/colors';
import styled from 'styled-components';
import moment from 'moment';

const ToolTipCard = styled('div')`
    background: #fff;
    border-radius: 3px;
    box-shadow: 0px 0px 6px #00000020;
    padding: 5px;
`;

const ToolTipData = styled('p')`
    margin-top: 5px;
    font-size: 12px;
`;

registerTheme('default', {
    geometries: {
        interval: {
            rect: {
                default: { style: { fill: COLORS.light0, fillOpacity: 1 } },
            }
        }
    }
});

registerShape('interval', 'border-radius', {
    draw(cfg, container) {
        const { points } = cfg;
        let path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, points[1].y]);
        path.push(['L', points[2].x, points[2].y]);
        path.push(['L', points[3].x, points[3].y]);
        path.push('Z');
        path = this.parsePath(path); // 将 0 - 1 转化为画布坐标

        const group = container.addGroup();
        group.addShape('rect', {
            attrs: {
                x: path[1][1], // 矩形起始点为左上角
                y: path[1][2],
                width: path[2][1] - path[1][1],
                height: path[0][2] - path[1][2],
                fill: cfg.color,
                radius: (path[2][1] - path[1][1]) / 2,
            },
        });

        return group;
    },
});

const CustomToolTip = ({line}) => {
    console.log(line);
    return (
        <ToolTipCard>
            <ToolTipData>Dia: {line[0].data.class_dateofclass}</ToolTipData>
            <ToolTipData>Min: {line[0].data.class_time} minutos</ToolTipData>
        </ToolTipCard>
    )
}


export default function BarChart({ data }) {

    getTheme('default')

    return (
        <Chart height={230} autoFit data={data} interactions={['active-region']} padding={[30, 30, 30, 50]} >
            <Interval
                position="class_dateofclass*class_time"
                color={COLORS.light0}
                shape="border-radius"
            />
            <Axis name="Min. estudados" visible={false} />
            <Axis name="Dias" visible={true} />
            <Tooltip children={(a, line) => <CustomToolTip line={line}/>} />
        </Chart>
    )
}