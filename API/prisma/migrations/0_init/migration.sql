-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Carrito" (
    "id_carrito" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER,

    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("id_carrito")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "descripcion" VARCHAR(255),

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id_cliente" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "apellido" VARCHAR(100),
    "telefono" VARCHAR(20),
    "correo" VARCHAR(150),

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "Det_Met_Pago" (
    "id_det_met_pago" SERIAL NOT NULL,
    "id_venta" INTEGER NOT NULL,
    "id_metodo_pago" INTEGER NOT NULL,
    "monto" DECIMAL(10,2),

    CONSTRAINT "Det_Met_Pago_pkey" PRIMARY KEY ("id_det_met_pago")
);

-- CreateTable
CREATE TABLE "Detalle_Ventas" (
    "id_detalle_venta" SERIAL NOT NULL,
    "id_venta" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER,
    "precio_unitario" DECIMAL(10,2),
    "subtotal" DECIMAL(10,2),

    CONSTRAINT "Detalle_Ventas_pkey" PRIMARY KEY ("id_detalle_venta")
);

-- CreateTable
CREATE TABLE "Metodos_Pago" (
    "id_metodo_pago" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "descripcion" VARCHAR(255),

    CONSTRAINT "Metodos_Pago_pkey" PRIMARY KEY ("id_metodo_pago")
);

-- CreateTable
CREATE TABLE "Productos" (
    "id_producto" SERIAL NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "nombre" VARCHAR(150),
    "descripcion" VARCHAR(255),
    "precio" DECIMAL(10,2),
    "stock" INTEGER,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "usuario" VARCHAR(100),
    "contrasena" VARCHAR(255),

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "id_venta" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2),

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("id_venta")
);

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Clientes"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Det_Met_Pago" ADD CONSTRAINT "Det_Met_Pago_id_metodo_pago_fkey" FOREIGN KEY ("id_metodo_pago") REFERENCES "Metodos_Pago"("id_metodo_pago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Det_Met_Pago" ADD CONSTRAINT "Det_Met_Pago_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "Ventas"("id_venta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Detalle_Ventas" ADD CONSTRAINT "Detalle_Ventas_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Detalle_Ventas" ADD CONSTRAINT "Detalle_Ventas_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "Ventas"("id_venta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Clientes"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Clientes"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;
