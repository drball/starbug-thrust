#pragma strict
//---the button on the final level to click and load BD website

function Start () {

}

function OnMouseEnter() {
	renderer.material.color = Color.grey;
}

function OnMouseExit (){
	renderer.material.color = Color.white;
}

function OnMouseDown() {
	Application.OpenURL ("http://bluedwarf.co.uk");
}

