// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Introduction" screen, two unrelated single-spring systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var SingleSpringSystem = require( 'HOOKES_LAW/introduction/model/SingleSpringSystem' );

  /**
   * @constructor
   */
  function IntroductionModel() {
    this.system1 = new SingleSpringSystem();
    this.system2 = new SingleSpringSystem(remove );
  }

  return inherit( Object, IntroductionModel, {

    reset: function() {
      this.system1.reset();
      this.system2.reset();
    }
  } );
} );