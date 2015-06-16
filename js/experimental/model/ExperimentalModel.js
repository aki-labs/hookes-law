// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );

  function ExperimentalModel() {

    // ranges and default values
    this.pitchSizeRange = new Range( 0.1, 2, 1 );
    this.deltaPhaseRange = new Range( 0, 7, 1 );
    this.aspectRatioRange = new Range( 0.5, 3, 1 );
    this.lineWidthRange = new Range( 1, 10, 3 );
    this.radiusRange = new Range( 20, 70, 50 );

    PropertySet.call( this, {
      pitchSize: this.pitchSizeRange.defaultValue,
      deltaPhase: this.deltaPhaseRange.defaultValue,
      aspectRatio: this.aspectRatioRange.defaultValue, // {number} y:x aspect radio of the loop radius
      lineWidth: this.lineWidthRange.defaultValue, // {number} lineWidth used to draw the coil
      radius: this.radiusRange.defaultValue // {number} radius of a loop with aspect ratio of 1:1
    } );
  }

  return inherit( PropertySet, ExperimentalModel );
} );
