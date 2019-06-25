function Ctx(dom){
  return dom.getContext("2d");
}

Ctx.prototype.beginPath = function(){
  this.beginPath();
  return this;
}
Ctx.prototype.lineWidth = function(number){
  console.log(this);
  this.lineWidth = number;
  return this;
}