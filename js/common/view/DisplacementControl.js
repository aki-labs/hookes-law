// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for spring displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'HOOKES_LAW/common/view/NumberControl' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var displacementColonString = require( 'string!HOOKES_LAW/displacementColon' );
  var metersString = require( 'string!HOOKES_LAW/meters' );

  /**
   * @param {Property.<boolean>} displacementProperty
   * @param {Range} displacementRange
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function DisplacementControl( displacementProperty, displacementRange, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueFont: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
      decimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
      units: metersString,
      delta: HookesLawConstants.DISPLACEMENT_DELTA,
      majorTicksValues: null,
      minorTickSpacing: 1,
      thumbFillEnabled: HookesLawColors.DISPLACEMENT,
      startCallback: function() { numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 ); },
      endCallback: function() { numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 ); }
    }, options );

    // major ticks
    if ( options.majorTickValues ) {
      options.majorTicks = [];
      for ( var i = 0; i < options.majorTickValues.length; i++ ) {
        options.majorTicks.push( {
          value: options.majorTickValues[ i ],
          label: new Text( Util.toFixed( options.majorTickValues[ i ], HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
        } );
      }
    }

    NumberControl.call( this, displacementColonString, displacementProperty, displacementRange, options );
  }

  return inherit( NumberControl, DisplacementControl );
} );
