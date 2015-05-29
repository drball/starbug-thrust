#pragma strict

private var overColor : Color = Color(1,1,1,.5);
private var normalColor : Color;


function Start () {
	normalColor = guiTexture.color;
}


function OnMouseEnter() {
	guiTexture.color = overColor;

}

function OnMouseExit (){
	guiTexture.color = normalColor;
}


function OnMouseDown() {

	Application.OpenURL ("http://bluedwarf.co.uk");
}