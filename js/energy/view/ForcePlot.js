// Copyright 2015-2022, University of Colorado Boulder

/**
 *  ForcePlot is an XY plot of displacement (x axis) vs force (y axis),
 *  with energy (E) being the area under the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import { Line } from '../../../../scenery/js/imports.js';
import { Path } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import hookesLawStrings from '../../hookesLawStrings.js';
import XYPointPlot from './XYPointPlot.js';

class ForcePlot extends XYPointPlot {

  /**
   * @param {Spring} spring
   * @param {number} unitDisplacementLength - view length of a 1m displacement vector
   * @param {BooleanProperty} valuesVisibleProperty - whether values are visible on the plot
   * @param {BooleanProperty} displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param {BooleanProperty} energyVisibleProperty - whether the area that represents energy is filled in
   * @param {Object} [options]
   */
  constructor( spring, unitDisplacementLength,
               valuesVisibleProperty, displacementVectorVisibleProperty, energyVisibleProperty, options ) {

    options = merge( {

      // both axes
      axisFont: HookesLawConstants.XY_PLOT_AXIS_FONT,
      valueFont: HookesLawConstants.XY_PLOT_VALUE_FONT,

      // point
      pointFill: HookesLawColors.SINGLE_SPRING,

      // x axis
      minX: unitDisplacementLength * ( 1.1 * spring.displacementRange.min ),
      maxX: unitDisplacementLength * ( 1.1 * spring.displacementRange.max ),
      xString: hookesLawStrings.displacement,
      xUnits: hookesLawStrings.meters,
      xDecimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
      xValueFill: HookesLawColors.DISPLACEMENT,
      xUnitLength: unitDisplacementLength,
      xLabelMaxWidth: 100, // constrain width for i18n, determined empirically

      // y axis
      minY: -HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      maxY: HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      yString: hookesLawStrings.appliedForce,
      yUnits: hookesLawStrings.newtons,
      yDecimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      yValueFill: HookesLawColors.APPLIED_FORCE,
      yUnitLength: HookesLawConstants.UNIT_FORCE_Y,

      // phet-io
      tandem: Tandem.REQUIRED

    }, options );

    super( spring.displacementProperty, spring.appliedForceProperty,
      valuesVisibleProperty, displacementVectorVisibleProperty, options );

    // The line that corresponds to F = kx
    const forceLineNode = new Line( 0, 0, 1, 1, {
      stroke: HookesLawColors.APPLIED_FORCE,
      lineWidth: 3
    } );
    this.addChild( forceLineNode );
    forceLineNode.moveToBack();

    // energy area
    const energyPath = new Path( null, {
      fill: HookesLawColors.ENERGY
    } );
    this.addChild( energyPath );
    energyPath.moveToBack();

    // update force line
    spring.springConstantProperty.link( springConstant => {

      // x
      const minDisplacement = options.xUnitLength * spring.displacementRange.min;
      const maxDisplacement = options.xUnitLength * spring.displacementRange.max;

      // F = kx
      const minForce = -options.yUnitLength * springConstant * spring.displacementRange.min;
      const maxForce = -options.yUnitLength * springConstant * spring.displacementRange.max;
      forceLineNode.setLine( minDisplacement, minForce, maxDisplacement, maxForce );
    } );

    // update energy area (triangle)
    Property.multilink( [ spring.displacementProperty, spring.appliedForceProperty, energyVisibleProperty ],
      ( displacement, appliedForce, visible ) => {
        const fixedDisplacement = Utils.toFixedNumber( displacement, options.xDecimalPlaces );
        const x = options.xUnitLength * fixedDisplacement;
        const y = -appliedForce * options.yUnitLength;
        energyPath.visible = ( fixedDisplacement !== 0 && visible );
        if ( energyPath.visible ) {
          energyPath.shape = new Shape().moveTo( 0, 0 ).lineTo( x, 0 ).lineTo( x, y ).close();
        }
      } );
  }
}

hookesLaw.register( 'ForcePlot', ForcePlot );

export default ForcePlot;