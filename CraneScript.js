#pragma strict

public var retracting = false;

private var targetY : float;
private var speed = .05;
private var player : GameObject;
private var startPosY : float;

function Start () {
	
	player = GameObject.Find("Player"); 

	
	startPosY = transform.position.y;
}

function Update () {

	//always move -- down or up if retracting
	if(retracting == false) {
		targetY = player.transform.position.y + 3.5;
		
		if(transform.position.y > targetY) {
			transform.position.y = (transform.position.y - speed);// * Time.deltaTime;
		}
		
	} else {

		if(transform.position.y < startPosY) {
				transform.position.y = (transform.position.y + speed);// * Time.deltaTime;
		}
	}
	
	
	
	//transform.position = Vector3.Lerp(startMarker.position, endMarker.position, fracJourney);
}

function StartRetracting() {
	Debug.Log("Crane going back up");
	retracting = true;
}

function RemoveCrate() {
	Debug.Log("Removing crate");
	
	var crateToDestroy : Transform = transform.Find("Crane__Crate");
	//Destroy(crateToDestroy,0);
	crateToDestroy.gameObject.active = false;
}

function AddCrate() {
	Debug.Log("Adding crate");
	
	var crateToAdd : Transform = transform.Find("Crane__Crate");
	crateToAdd.gameObject.active = true;
}