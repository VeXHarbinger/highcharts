import type { BenchmarkContext, BenchmarkResult } from '../benchmark';
import { performance } from 'node:perf_hooks';
import { join } from 'node:path';

function generateColumnData(rows: number, columns: number){
    const data = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(Math.random());
        }
        data.push(row);
    }
    return data;
}

export const config = {
    sizes: [100, 1000, 10_000, 100_000, 1_000_000, 2_500_000]
};

export function before(size: number) {
    return {
        fileName: `data-${size}.json`,
        func: () => generateColumnData(size, 5)
    };
}

export default async function benchmarkTest(
    {
        CODE_PATH,
        data
    }: BenchmarkContext
): Promise<BenchmarkResult> {
    const hc = require(join(CODE_PATH, '/highcharts.src.js'))();
    require(join(CODE_PATH, '/modules/data-tools.src.js'))(hc);

    const { DataTable } = hc;

    const columns = data;

    performance.mark('Start');

    new DataTable({
        columns
    });

    performance.mark('End');

    return performance.measure('Start to Now', 'Start', 'End').duration;
}
