#pragma strict

private var playerObject : GameObject;
var minX : float;
var maxX : float;
var minY : float;
var maxY : float;


function Start () {
	playerObject = GameObject.Find("Player"); 
}

function Update () {


	transform.position.x = playerObject.transform.position.x;

	
	
	var pos : Vector3 = transform.position;
    pos.x = Mathf.Clamp(playerObject.transform.position.x, minX, maxX);
    pos.y = Mathf.Clamp(playerObject.transform.position.y, minY, maxY);
    transform.position = pos;
}