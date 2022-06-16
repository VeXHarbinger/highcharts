/* *
 *
 *  Copyright (c) 2019-2021 Highsoft AS
 *
 *  Boost module: stripped-down renderer for higher performance
 *
 *  License: highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type Chart from '../../Core/Chart/Chart';
import type Color from '../../Core/Color/Color';

import BoostChart from './BoostChart.js';
import BU from './BoostUtils.js';
import init from './BoostInit.js';
import initCanvasBoost from '../../Extensions/BoostCanvas.js';
import './BoostOverrides.js';
import NamedColors from './NamedColors.js';
import U from '../../Core/Utilities.js';
const {
    error
} = U;

/* *
 *
 *  Composition
 *
 * */

namespace Boost {

    /* *
     *
     *  Constants
     *
     * */

    const composedClasses: Array<Function> = [];

    /* *
     *
     *  Functions
     *
     * */

    /**
     * @private
     */
    export function compose(
        ChartClass: typeof Chart,
        ColorClass: typeof Color
    ): void {
        if (!BU.hasWebGLSupport()) {
            if (typeof initCanvasBoost !== 'undefined') {
                // Fallback to canvas boost
                initCanvasBoost();
            } else {
                error(26);
            }
        } else {
            // WebGL support is alright, and we're good to go.
            init();
        }

        if (composedClasses.indexOf(ColorClass) === -1) {
            composedClasses.push(ColorClass);

            ColorClass.names = {
                ...ColorClass.names,
                ...NamedColors.defaultHTMLColorMap
            };
        }

        BoostChart.compose(ChartClass);
    }

}

export default Boost;
