import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { PharmacyInventoryService } from './pharmacy-inventory.service';

@Controller('api/pharmacy-inventory')
export class PharmacyInventoryController {

  constructor(private readonly inventoryService: PharmacyInventoryService) {}

  // Add medicine
  @Post()
  addMedicine(@Body() body: any) {
    return this.inventoryService.addMedicine(body);
  }

  // Get pharmacy medicines
  @Get(':pharmacyId')
  getMedicines(@Param('pharmacyId') pharmacyId: string) {
    return this.inventoryService.getMedicines(pharmacyId);
  }

  // Update stock
  @Put('update/:id')
  updateStock(@Param('id') id: string, @Body() body: any) {
    return this.inventoryService.updateStock(id, body.quantity);
  }
}