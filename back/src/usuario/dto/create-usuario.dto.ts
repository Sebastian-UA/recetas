//export class CreateUsuarioDto {}

import {usuario } from "@prisma/client";
export type CreateUsuarioDto =Omit<usuario,'id'|'createdAd'|'updateAd'>