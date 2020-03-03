import {IInputs, IOutputs} from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class GridCard implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    //Reference to the PCF context input object
    private _context: ComponentFramework.Context<IInputs>;
    // Event Handler 'refreshData' reference
    private _refreshData: EventListenerOrEventListenerObject;

    // PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
    private _notifyOutputChanged: () => void;

    //contains all the elements for the control
	private _cardContainer: HTMLDivElement;

	private _cardTitle: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
        debugger;
        console.log("Init Function");
        //control initialization code
        this._context = context;
		this._notifyOutputChanged = notifyOutputChanged;

		this._cardContainer = document.createElement("div");
		this._cardContainer.id = "card";
		
		this._cardTitle = document.createElement("div");
		this._cardTitle.id = "title";

		//Associate controls to container
		container.appendChild(this._cardTitle);//add a elipses button here later so that we can build a flyout action menu
		container.appendChild(this._cardContainer);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
        // Add code to update control view
        console.log("update view called");
		if (context.parameters.GridCardDataSet.loading) return;
		const dataSet = context.parameters.GridCardDataSet;
		var entityType = dataSet.getTargetEntityType();
		let nameField: string = context.parameters.primaryFieldName.raw ? context.parameters.primaryFieldName.raw : "";

		//add segment to render empty divs if no records

        for (var i = 0; i < context.parameters.GridCardDataSet.paging.totalResultCount; i++) {
			var recordId = dataSet.sortedRecordIds[i];
			
            var record = dataSet.records[recordId] as DataSetInterfaces.EntityRecord;

			var divTag = document.createElement("div");
        	divTag.id = recordId;
			let content: string = "";
			let cols = dataSet.columns;

			//-------------------------------------------------------
			//add a header field with formatting and hyperlinks
			var titleTag = document.createElement("a");
			titleTag.href = "#";
			titleTag.className = "infoTitle";

			var titleLabel = document.createElement("h3");
			titleLabel.innerHTML = record.getFormattedValue(nameField)
			titleLabel.addEventListener('click', function () {
				var recordRef: ComponentFramework.EntityReference = {
					etn: entityType,
					id: { guid: recordId },
					name: record.getFormattedValue(nameField)
				};
				context.parameters.GridCardDataSet.openDatasetItem(recordRef);
			});
			titleTag.appendChild(titleLabel);
			this._cardTitle.innerHTML = "";//clear any existing html
			this._cardTitle.appendChild(titleTag);
			//-------------------------------------------------------

			//create table
			content = content.concat("</br><table  id='gridCard'>");
			//loop through field columns to create rows
			for (var i = 0; i <  cols.length; i++) {
				content = content.concat("<tr><th>" + cols[i].displayName + "</th>");
                var strValue = record.getFormattedValue(cols[i].name) != null ? record.getFormattedValue(cols[i].name) : "";
                content = content.concat("<td> " + strValue + "</td></tr>");
			}
			//close table
			content = content.concat("</table>");

			this._cardContainer.innerHTML = content;
		}
	}
	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}