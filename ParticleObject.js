const lifeDecay = 0.01;

const ParticleObject = function (mesh, lifetime, speed, acceleration, direction, startColor, endColor) {
    // Sphere mesh
    this.mesh = mesh;

    // Total Lifetime of this object
    this.lifetime = lifetime;

    // Lifetime left of this object
    this.lifeLeft = lifetime;

    // Speed of object
    this.speed = speed;

    // Acceleration of object
    this.acceleration = acceleration;

    // Direction of object
    this.direction = direction;

    // The color the particle spawns as (THREE.Color)
    this.startColor = startColor;

    // The color the particle interpolates to throughout its lifetime
    this.endColor = endColor;

    // The color change in each update
    this.deltaR = parseFloat((endColor.r - startColor.r) / lifetime * lifeDecay);
    this.deltaG = parseFloat((endColor.g - startColor.g) / lifetime * lifeDecay);
    this.deltaB = parseFloat((endColor.b - startColor.b) / lifetime * lifeDecay);
};

ParticleObject.prototype.update = function(){
    this.updatePosition();
    this.updateLifeLeft();
    this.adjustSpeedByAcceleration();
    this.updateColor();
};

ParticleObject.prototype.updatePosition = function() {
    this.mesh.position.set(
        this.mesh.position.x + (this.direction.elements[0] * this.speed),
        this.mesh.position.y + (this.direction.elements[1] * this.speed),
        this.mesh.position.z + (this.direction.elements[2] * this.speed)
    );
};

ParticleObject.prototype.updateColor = function() {
    this.mesh.material.color = new THREE.Color(
        parseFloat(this.mesh.material.color.r) + this.deltaR,
        parseFloat(this.mesh.material.color.g) + this.deltaG,
        parseFloat(this.mesh.material.color.b) + this.deltaB
    );
};

ParticleObject.prototype.updateLifeLeft = function() {
    this.lifeLeft = this.lifeLeft - lifeDecay;
};

ParticleObject.prototype.adjustSpeedByAcceleration = function() {
    this.speed = this.speed * this.acceleration;
};

ParticleObject.prototype.resetColor = function() {
    this.mesh.material.color = this.startColor;
};

ParticleObject.prototype.swapColor = function(newStartColor, newEndColor) {
    this.startColor = newStartColor;
    this.endColor = newEndColor;
    this.deltaR = parseFloat((newEndColor.r - newStartColor.r) / this.lifetime * lifeDecay);
    this.deltaG = parseFloat((newEndColor.g - newStartColor.g) / this.lifetime * lifeDecay);
    this.deltaB = parseFloat((newEndColor.b - newStartColor.b) / this.lifetime * lifeDecay);
};

ParticleObject.prototype.setPosition = function(x, y, z) {
    this.mesh.position.set(x,y,z);
};

ParticleObject.prototype.getMesh = function()
{
    return this.mesh;
};

ParticleObject.prototype.getLifeLeft = function()
{
    return this.lifeLeft;
};

ParticleObject.prototype.setLifetime = function(lifetime)
{
    this.lifetime = lifetime;
    this.lifeLeft = lifetime;
};

ParticleObject.prototype.setSize = function(size)
{
    this.mesh.scale.setScalar(size);
};

ParticleObject.prototype.getSpeed = function()
{
    return this.speed;
};

ParticleObject.prototype.setSpeed = function(speed)
{
    this.speed = speed;
};

ParticleObject.prototype.getAcceleration = function()
{
    return this.acceleration;
};

ParticleObject.prototype.setAcceleration = function(acceleration)
{
    this.acceleration = acceleration;
};

ParticleObject.prototype.getDirection = function()
{
    return this.direction;
};