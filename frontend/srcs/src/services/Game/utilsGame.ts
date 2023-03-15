import { BackSide, MeshBasicMaterial, TextureLoader } from "three";
import up from "../../assets/skybox/space/purple/box_up.png";
import bk from "../../assets/skybox/space/purple/box_bk.png";
import dn from "../../assets/skybox/space/purple/box_dn.png";
import ft from "../../assets/skybox/space/purple/box_ft.png";
import lf from "../../assets/skybox/space/purple/box_lf.png";
import rt from "../../assets/skybox/space/purple/box_rt.png";

export function createPathStrings(filename: string) {
  const basePath =
    "/mnt/nfs/homes/hrecolet/Documents/transcendance/frontend/srcs/src/assets/skybox/";

  const baseFilename = basePath + filename;

  const fileType = ".png";

  const sides = ["ft", "bk", "up", "dn", "rt", "lf"];

  const pathStings = sides.map((side) => {
    return import(baseFilename + "_" + side + fileType);
  });

  return pathStings;
}

export function createMaterialArray(filename: string) {
  // const skyboxImagepaths = createPathStrings(filename);
  const skyboxImagepaths = [ft, bk, up, dn, rt, lf];

  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new TextureLoader().load(image);

    return new MeshBasicMaterial({ map: texture, side: BackSide });
  });

  return materialArray;
}

export function degreeToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
