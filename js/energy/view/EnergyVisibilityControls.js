// Copyright 2015-2017, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Energy" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  var HSeparator = require( 'SUN/HSeparator' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var barGraphString = require( 'string!HOOKES_LAW/barGraph' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var energyPlotString = require( 'string!HOOKES_LAW/energyPlot' );
  var energyString = require( 'string!HOOKES_LAW/energy' );
  var forcePlotString = require( 'string!HOOKES_LAW/forcePlot' );
  var valuesString = require( 'string!HOOKES_LAW/values' );

  /**
   * @param {EnergyViewProperties} properties
   * @param {Object} [options]
   * @constructor
   */
  function EnergyVisibilityControls( properties, options ) {

    options = _.extend( _.clone( HookesLawConstants.VISIBILITY_PANEL_OPTIONS ), options );

    // radio buttons
    var energyBarRadioButton = new AquaRadioButton( properties.graphProperty, 'energyBar',
      new Text( barGraphString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );
    var energyXYRadioButton = new AquaRadioButton( properties.graphProperty, 'energyXY',
      new Text( energyPlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );
    var forceXYRadioButton = new AquaRadioButton( properties.graphProperty, 'forceXY',
      new Text( forcePlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );

    // energy check box, enabled when "Force Plot" radio button is selected
    var energyIcon = new HBox( {
      children: [
        new Text( energyString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        // triangle
        new Path( new Shape().moveTo( 0, 0 ).lineTo( 20, 0 ).lineTo( 20, -10 ).close(), { fill: HookesLawColors.ENERGY } )
      ],
      spacing: 6
    } );
    var energyCheckBox = new CheckBox( energyIcon,
      properties.energyOnForcePlotVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    properties.graphProperty.link( function( graph ) {
      energyCheckBox.enabled = ( graph === 'forceXY' );
    } );

    // other check boxes
    var appliedForceCheckBox = new CheckBox(
      HookesLawIconFactory.createVectorCheckBoxContent( new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.APPLIED_FORCE
      } ),
      properties.appliedForceVectorVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var displacementCheckBox = new CheckBox(
      HookesLawIconFactory.createVectorCheckBoxContent( new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.DISPLACEMENT,
        vectorType: 'displacement'
      } ),
      properties.displacementVectorVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var equilibriumPositionCheckBox = new CheckBox(
      HookesLawIconFactory.createEquilibriumPositionCheckBoxContent(),
      properties.equilibriumPositionVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var valuesCheckBox = new CheckBox(
      new Text( valuesString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.valuesVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );

    // Adjust touch areas
    var spacing = 20;
    var controls = [
      energyBarRadioButton,
      energyXYRadioButton,
      forceXYRadioButton,
      energyCheckBox,
      appliedForceCheckBox,
      displacementCheckBox,
      equilibriumPositionCheckBox,
      valuesCheckBox
    ];
    for ( var i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var maxControlWidth = _.maxBy( controls, function( node ) { return node.width; } ).width;

    var content = new VBox( {
      children: [
        energyBarRadioButton,
        energyXYRadioButton,
        forceXYRadioButton,
        // "Energy" check box indented below "Force Plot" radio button
        new HBox( { children: [ new HStrut( 25 ), energyCheckBox ] } ),
        new HSeparator( maxControlWidth, HookesLawConstants.SEPARATOR_OPTIONS ),
        appliedForceCheckBox,
        displacementCheckBox,
        equilibriumPositionCheckBox,
        valuesCheckBox
      ],
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  hookesLaw.register( 'EnergyVisibilityControls', EnergyVisibilityControls );

  return inherit( Panel, EnergyVisibilityControls );
} );
