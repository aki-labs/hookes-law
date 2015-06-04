// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constants for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );

  return {
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) },

    // number of decimal places for quantities
    SPRING_CONSTANT_DECIMAL_PLACES: 0,
    APPLIED_FORCE_DECIMAL_PLACES: 0,
    SPRING_FORCE_DECIMAL_PLACES: 0,
    DISPLACEMENT_DECIMAL_PLACES: 3,
    ENERGY_DECIMAL_PLACES: 2,

    // delta for controls
    SPRING_CONSTANT_DELTA: 10,
    APPLIED_FORCE_DELTA: 1,
    DISPLACEMENT_DELTA: 0.001,

    // specific to parallel system, where components require a decimal place
    PARALLEL_COMPONENTS_SPRING_FORCE_DECIMAL_PLACES: 1,
    PARALLEL_COMPONENTS_APPLIED_FORCE_DELTA: 0.1,

    // scale factors for vectors
    UNIT_FORCE_VECTOR_LENGTH: 1.75, // view length of a force vector whose magnitude is 1 N
    UNIT_DISPLACEMENT_VECTOR_LENGTH: 200, // view length of a displacement vector whose magnitude is 1 m

    // fonts
    CONTROL_PANEL_TITLE_FONT: new HookesLawFont( 18 ),
    CONTROL_PANEL_VALUE_FONT: new HookesLawFont( 18 ),
    VECTOR_VALUE_FONT: new HookesLawFont( 18 ),
    XY_PLOT_VALUE_FONT: new HookesLawFont( 18 ),
    XY_PLOT_AXIS_FONT: new HookesLawFont( 16 ),

    // sizes and lengths for UI components
    WALL_SIZE: new Dimension2( 25, 170 ),
    VECTOR_HEAD_SIZE: new Dimension2( 20, 10 ),
    SLIDER_THUMB_SIZE: new Dimension2( 17, 34 ),
    SLIDER_TRACK_SIZE: new Dimension2( 180, 3 ),
    SLIDER_MAJOR_TICK_LENGTH: 20,

    // options
    CHECK_BOX_OPTIONS: {
      spacing: 8
    },
    // text on UI controls
    CONTROL_TEXT_OPTIONS: {
      font: new HookesLawFont( 18 )
    },
    DISPLACEMENT_VECTOR_OPTIONS: {
      stroke: HookesLawColors.DISPLACEMENT,
      headWidth: 20,
      headHeight: 10,
      headLineWidth: 3,
      tailLineWidth: 3
    },
    MAJOR_TICK_LABEL_OPTIONS: {
      font: new HookesLawFont( 14 )
    },
    RADIO_BUTTON_OPTIONS: {
      radius: 12
    },
    SPRING_PANEL_OPTIONS: {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      xMargin: 20,
      yMargin: 5
    },
    VISIBILITY_PANEL_OPTIONS: {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      xMargin: 15,
      yMargin: 15
    }
  };
} );
