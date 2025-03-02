# TipsTest

# Tips Payment Application

Este es un proyecto de una aplicación de propinas que permite calcular, dividir y registrar los pagos de propina entre un grupo de personas. El proyecto tiene una interfaz donde los usuarios pueden ingresar el monto de la propina, dividirlo entre un número de personas y registrar los pagos realizados mediante diferentes métodos.

## Funcionalidades principales
1. **Calcular y dividir la propina**: Los usuarios pueden ingresar el monto total de la propina y el número de personas para dividir el total entre ellas.
2. **Métodos de pago**: Los usuarios pueden elegir entre varios métodos de pago (por ejemplo, efectivo, tarjetas bancarias) para registrar su contribución.
3. **Historial de pagos**: Se mantiene un registro de todos los pagos realizados, con la opción de ver el estado actualizado de la propina.
4. **Interacción con una API**: Los pagos se guardan de manera persistente a través de una API RESTful que maneja las solicitudes de pago.

## Estructura del Proyecto

### Frontend (Vue.js)
El frontend está construido con **Vue.js** y usa un diseño de componentes para la interfaz de usuario. Los principales componentes incluyen:

- `HeaderInfo`: Muestra información general en el encabezado.
- `InputTips`: Permite al usuario ingresar el monto total de la propina y el número de personas.
- `DivisionTip`: Muestra la división de la propina entre las personas.
- `PaymentMethod`: Permite al usuario elegir un método de pago.
- `PaymentsSection`: Muestra el historial de pagos registrados.

### Backend (Node.js con Express)
El backend está construido con **Node.js** y **Express.js**. La API maneja las solicitudes para registrar pagos de propina y actualiza el estado de las propinas.

### Rutas de la API

- `POST /api/tips`: Registra el monto de la propina.
- `POST /api/payments`: Registra un pago y asocia el pago con una propina específica.

## Instalación

### Requisitos previos

1. **Node.js** (versión 14 o superior)
2. **Vue CLI** (para desarrollar el frontend)
3. **Base de datos (opcional)**: Si deseas persistir los datos, puedes usar una base de datos como MongoDB o MySQL. Este proyecto utiliza un arreglo en memoria (`tips`) para simplificar el ejemplo.

### Pasos para instalar

#### Backend

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tips-payment-app.git

2. Navega a la carpeta del servidor
  cd backend

3. Instala las dependencias:
  npm install

4. Inicia el servidor
  npm run dev o npm start

  El servidor estará ejecutándose en http://localhost:3000

#### Frontend

1. Navega a la carpeta del servidor
  cd frontend

2. Instala las dependencias:
  npm install

3. Inicia el servidor
  nnpm run serve

  El servidor estará ejecutándose en http://localhost:8080


### Uso
En el frontend, ingresa el monto total de la propina y el número de personas.
Elige el método de pago y registra los pagos para cada persona.
Los pagos se guardan a través de la API backend y se actualizan en la interfaz.
Visualiza el total pagado y el monto restante a pagar.

