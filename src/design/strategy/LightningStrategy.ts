
import { BulletModel } from "~/model/Bullet.model";
import { PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/services/Bullet";

import { ItemModel } from "~/model/Item.model";
import { ItemSupport } from "~/services/Item";
import GIFT_LIGHT from '/images/gift-light.png';
import LIGHT_BULLET from '/images/light-bullet.png';
import { randomIntFromInterval } from "~/extensions/helper";
import { IStrategy } from "~/interface/Stategy.interface";
import { Vector } from "~/model/types";

export class LightStrategy implements IStrategy {
  public doChangeInfoBullet(data: BulletModel, pos: Vector): Bullet {
    const lightBullet: BulletModel = {
      speed: data.speed + 6,
      size: data.size + 7,
      image: LIGHT_BULLET,
      damage: randomIntFromInterval(data.damage - 1, data.damage + 1)  
    };
    const bullet = new Bullet(
      lightBullet.speed, lightBullet.size, 
      {x: pos.x + (PADDLE_WIDTH/2 - lightBullet.size/2),
       y: pos.y}, 
       lightBullet.image, lightBullet.damage, 15);
    return bullet;
  }
  
  public doChangeTypeItem(data: ItemModel, pos: Vector): ItemSupport {
    const fireItem: ItemModel = {
      speed: data.speed,
      size: data.size-10,
      image: GIFT_LIGHT,
      type: data.type
    }
    const item = new ItemSupport(
      fireItem.speed, fireItem.size,
      {x: pos.x, y: pos.y}, 
      fireItem.image, fireItem.type.Id);
    return item;
  }
}