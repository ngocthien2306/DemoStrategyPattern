
import { BulletModel } from "~/model/Bullet.model";
import { PADDLE_WIDTH } from "~/setup";
import { Bullet } from "~/services/Bullet";

import { ItemSupport } from "~/services/Item";
import { ItemModel } from "~/model/Item.model";
import GIFT_STONE from '/images/gift-stone.png';
import STONE_BULLET from '/images/stone-bullet.png';
import { randomIntFromInterval } from "~/extensions/helper";
import { IStrategy } from "~/interface/Stategy.interface";
import { Vector } from "~/model/types";

export class StoneStrategy implements IStrategy {
  public doChangeInfoBullet(data: BulletModel, pos: Vector): Bullet {
    const iceBullet: BulletModel = {
      speed: data.speed + 5,
      size: data.size + 5,
      image: STONE_BULLET,
      damage: randomIntFromInterval(data.damage, data.damage + 3)  
    };
    const bullet = new Bullet(
      iceBullet.speed, iceBullet.size, 
      {x: pos.x + (PADDLE_WIDTH/2 - iceBullet.size/2),
       y: pos.y}, 
       iceBullet.image, iceBullet.damage, 1);

    return bullet;
  }
  public doChangeTypeItem(data: ItemModel, pos: Vector): ItemSupport {
    const fireItem: ItemModel = {
      speed: data.speed,
      size: data.size-10,
      image: GIFT_STONE,
      type: data.type
    }
    const item = new ItemSupport(
      fireItem.speed, fireItem.size,
      {x: pos.x, y: pos.y}, 
      fireItem.image, fireItem.type.Id);
    return item;
  }
}