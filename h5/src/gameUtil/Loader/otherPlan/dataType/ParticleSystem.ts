import { Gradient } from "./Gradient";
import { AnimationCurve1 } from "./AnimationCurve1";
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";

export class ParticleSystem extends AssetBundleFileInfo {
    public static classType = m4m["ParticleSystem"] = ParticleSystem;
    public main: ParticleMainModule = new ParticleMainModule();
    public emission: ParticleEmissionModule = new ParticleEmissionModule();
    public shape: ParticleShapeModule = new ParticleShapeModule();
    public velocityOverLifetime: ParticleVelocityOverLifetimeModule = new ParticleVelocityOverLifetimeModule();
    public limitVelocityOverLifetime: ParticleLimitVelocityOverLifetimeModule = new ParticleLimitVelocityOverLifetimeModule();
    public inheritVelocity: ParticleInheritVelocityModule = new ParticleInheritVelocityModule();
    public forceOverLifetime: ParticleVelocityOverLifetimeModule = new ParticleVelocityOverLifetimeModule();
    public colorOverLifetime: ColorBySpeed = new ColorBySpeed();
    public colorBySpeed: ColorBySpeed = new ColorBySpeed();
    public sizeOverLifetime: SizeOverLifetime = new SizeOverLifetime();
    public sizeBySpeed: SizeOverLifetime = new SizeOverLifetime();
    public rotationOverLifetime: SizeOverLifetime = new SizeOverLifetime();
    public rotationBySpeed: SizeOverLifetime = new SizeOverLifetime();
    public noise: Noise = new Noise();
    public textureSheetAnimation: TextureSheetAnimation = new TextureSheetAnimation();

}
class ParticleMainModule {
    public static classType = m4m["ParticleMainModule"] = ParticleMainModule;
    public duration: number = 0;
    public loop: boolean = false;
    public prewarm: boolean = false;
    public startDelay: MinMaxCurve = new MinMaxCurve();
    public startLifetime: MinMaxCurve = new MinMaxCurve();
    public startSpeed: MinMaxCurve = new MinMaxCurve();
    public useStartSize3D: boolean = false;
    public useStartRotation3D: boolean = false;
    public startSize: MinMaxCurve = new MinMaxCurve();
    public startSizeX: MinMaxCurve = new MinMaxCurve();
    public startSizeY: MinMaxCurve = new MinMaxCurve();
    public startSizeZ: MinMaxCurve = new MinMaxCurve();
    public gravityModifier: MinMaxCurve = new MinMaxCurve();
    public maxParticles: number = 0;
    public playOnAwake: boolean = false;
    public randomizeRotationDirection: number = 0;
    public scalingMode: number = 0;
    public simulationSpace: number = 0;
    public simulationSpeed: number = 0;
    public startColor: MinMaxGradient = new MinMaxGradient();
    public startRotation: MinMaxCurve = new MinMaxCurve();
    public startRotationX: MinMaxCurve = new MinMaxCurve();
    public startRotationY: MinMaxCurve = new MinMaxCurve();
    public startRotationZ: MinMaxCurve = new MinMaxCurve();

}
class MinMaxCurve {
    public static classType = m4m["MinMaxCurve"] = MinMaxCurve;
    public constant: number = 0;
    public constantMax: number = 0;
    public constantMin: number = 0;
    public curve: AnimationCurve1 = new AnimationCurve1();
    public curveMax: AnimationCurve1 = new AnimationCurve1();
    public curveMin: AnimationCurve1 = new AnimationCurve1();
    public curveMultiplier: number = 0;
    public mode: number = 0;

}
class MinMaxGradient {
    public static classType = m4m["MinMaxGradient"] = MinMaxGradient;
    public color: m4m.math.color = m4m.poolcolor();
    public colorMax: m4m.math.color = m4m.poolcolor();
    public colorMin: m4m.math.color = m4m.poolcolor();
    public gradient: Gradient = new Gradient();
    public gradientMax: Gradient = new Gradient();
    public gradientMin: Gradient = new Gradient();

}
class ParticleEmissionModule {
    public static classType = m4m["ParticleEmissionModule"] = ParticleEmissionModule;
    public enabled: boolean = false;
    public rateOverDistance: MinMaxCurve = new MinMaxCurve();
    public rateOverTime: MinMaxCurve = new MinMaxCurve();
    public bursts: burst[] = [];

}
// tslint:disable-next-line: max-classes-per-file class-name
class burst {
    public static classType = m4m["burst"] = burst;
    public cycleCount: number = 0;
    public maxCount: number = 0;
    public minCount: number = 0;
    public repeatInterval: number = 0;
    public time: number = 0;

}
// tslint:disable-next-line: max-classes-per-file class-name
class ParticleShapeModule {
    public static classType = m4m["ParticleShapeModule"] = ParticleShapeModule;
    public alignToDirection: boolean = false;
    public angle: number = 0;
    public arc: number = 0;
    public arcMode: number = 0;
    public arcSpeed: MinMaxCurve = new MinMaxCurve();
    public arcSpread: number = 0;
    public box: m4m.math.vector3 = m4m.poolv3();
    public enabled: boolean = false;
    public length: number = 0;
    public radius: number = 0;
    public radiusMode: number = 0;
    public radiusSpeed: MinMaxCurve = new MinMaxCurve();
    public radiusSpread: number = 0;
    public randomDirectionAmount: number = 0;
    public shapeType: number = 0;
    public sphericalDirectionAmount: number = 0;

}
// tslint:disable-next-line: max-classes-per-file class-name
class ParticleVelocityOverLifetimeModule {
    public static classType = m4m["ParticleVelocityOverLifetimeModule"] = ParticleVelocityOverLifetimeModule;
    public enabled: boolean = false;
    public space: number = 0;
    public x: MinMaxCurve = new MinMaxCurve();
    public y: MinMaxCurve = new MinMaxCurve();
    public z: MinMaxCurve = new MinMaxCurve();

}
// tslint:disable-next-line: max-classes-per-file class-name
class ParticleLimitVelocityOverLifetimeModule {
    public static classType = m4m["ParticleLimitVelocityOverLifetimeModule"] = ParticleLimitVelocityOverLifetimeModule;
    public dampen: number = 0;
    public enabled: boolean = false;
    public limit: MinMaxCurve = new MinMaxCurve();
    public limitX: MinMaxCurve = new MinMaxCurve();
    public limitY: MinMaxCurve = new MinMaxCurve();
    public limitZ: MinMaxCurve = new MinMaxCurve();
    public separateAxes: boolean = false;
    public space: number = 0;

}
// tslint:disable-next-line: max-classes-per-file class-name
class ParticleInheritVelocityModule {
    public static classType = m4m["ParticleInheritVelocityModule"] = ParticleInheritVelocityModule;
    public enabled: boolean = false;
    public curve: MinMaxCurve = new MinMaxCurve();
    public mode: number = 0;

}
// tslint:disable-next-line: max-classes-per-file class-name
class ColorBySpeed {
    public static classType = m4m["ColorBySpeed"] = ColorBySpeed;
    public color: MinMaxGradient = new MinMaxGradient();
    public enabled: boolean = false;
    public range: m4m.math.vector2 = m4m.poolv2();

}
// tslint:disable-next-line: max-classes-per-file class-name
class SizeOverLifetime {
    public static classType = m4m["SizeOverLifetime"] = SizeOverLifetime;
    public enabled: boolean = false;
    public range: m4m.math.vector2 = m4m.poolv2();
    public separateAxes: boolean = false;
    public size: MinMaxCurve = new MinMaxCurve();
    public x: MinMaxCurve = new MinMaxCurve();
    public y: MinMaxCurve = new MinMaxCurve();
    public z: MinMaxCurve = new MinMaxCurve();

}
// tslint:disable-next-line: max-classes-per-file class-name
class Noise {
    public static classType = m4m["Noise"] = Noise;
    public enabled: boolean = false;
    public damping: boolean = false;
    public frequency: number = 0;
    public octaveCount: number = 0;
    public octaveMultiplier: number = 0;
    public octaveScale: number = 0;
    public quality: number = 0;
    public remap: MinMaxCurve = new MinMaxCurve();
    public remapEnabled: boolean = false;
    public remapMultiplier: number = 0;
    public remapX: MinMaxCurve = new MinMaxCurve();
    public remapXMultiplier: number = 0;
    public remapY: MinMaxCurve = new MinMaxCurve();
    public remapYMultiplier: number = 0;
    public remapZ: MinMaxCurve = new MinMaxCurve();
    public remapZMultiplier: number = 0;
    public scrollSpeed: MinMaxCurve = new MinMaxCurve();
    public scrollSpeedMultiplier: number = 0;
    public separateAxes: boolean = false;
    public strength: MinMaxCurve = new MinMaxCurve();
    public strengthMultiplier: number = 0;
    public strengthX: MinMaxCurve = new MinMaxCurve();
    public strengthXMultiplier: number = 0;
    public strengthY: MinMaxCurve = new MinMaxCurve();
    public strengthYMultiplier: number = 0;
    public strengthZ: MinMaxCurve = new MinMaxCurve();
    public strengthZMultiplier: number = 0;

}
// tslint:disable-next-line: max-classes-per-file class-name
class TextureSheetAnimation {
    public static classType = m4m["TextureSheetAnimation"] = TextureSheetAnimation;
    public animation: number = 0;
    public cycleCount: number = 0;
    public enabled: boolean = false;
    public flipU: number = 0;
    public flipV: number = 0;
    public frameOverTime: MinMaxGradient = new MinMaxGradient();
    public numTilesX: number = 0;
    public numTilesY: number = 0;
    public rowIndex: number = 0;
    public startFrame: MinMaxGradient = new MinMaxGradient();
    public useRandomRow: boolean = false;
    public uvChannelMask: number = 0;

}
