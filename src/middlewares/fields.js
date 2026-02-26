function verify(req,res,next, props){
    for(const prop in props){
        if(!req.body[prop]){
            return res.status(401).json(props[prop]);
        }
    }
    next();
}
function verifyCreateCommentFields(req, res, next){
    const props = {
        body: 'campo_obligatorio'
    }
    verify(req, res, next, props);
}
function verifyCreatePaymentFields(req, res, next){
    const props = {
        cardHolderName: 'nombre_obligatorio',
        number: 'numero_obligatorio',
        valMonth: 'mes_obligatorio',
        valYear: 'anyo_obligatorio'
    }
    verify(req, res, next, props);
}
function verifyCreateSpotFields(req, res, next){
    const props = {
        power: 'potencia_obligatoria',
        type: 'tipo_obligatorio',
        rate: 'tarifa_obligatoria',
        state: 'estado_obligatorio',
        station: 'estacion_obligatoria'
    }
    verify(req, res, next, props);
}
function verifyUpdateSpotState(req, res, next) {
	const bodyKeys = Object.keys(req.body);
  	if (bodyKeys.includes("state") && bodyKeys.length === 1) {
	    const props = {
      		state: "estado_obligatorio",
    	};
    	verify(req, res, next, props);
  	}
	else if(bodyKeys.includes("load") && bodyKeys.length === 1) {
	    const props = {
      		load: "carga_obligatoria",
    	};
    	verify(req, res, next, props);
  	}
	else{
		return res.status(401).json({msg: 'Unauthorized'});
	}
}
function verifyUpdateSpotFields(req, res, next){
    const props = {
        rate: 'tarifa_obligatoria',
        state: 'estado_obligatorio'
    }
    verify(req, res, next, props);
}
function verifyCreateStationFields(req, res, next){
    const props = {
        coordinatesLat: 'coordenadas_obligatorias',
        coordinatesLng: 'coordenadas_obligatorias',
        address: 'direccion_obligatoria',
        schedule: 'horario_obligatorio'
    }
    verify(req, res, next, props);
}
function verifyUpdateStationFields(req, res, next){
    const bodyKeys = Object.keys(req.body);
  	if (bodyKeys.includes("schedule") && bodyKeys.length === 1) {
	    const props = {
      		schedule: 'horario_obligatorio'
    	};
        verify(req, res, next, props);
    }
}
function verifyCreateUserFields(req, res, next){
    const props = {
        username: 'usuario_obligatorio',
        name: 'nombre_obligatorio',
        surnames: 'apellido_obligatorio',
        email: 'email_obligatorio',
        password: 'contrasena_obligatoria'
    }
    verify(req, res, next, props);
}
function verifyUpdateUserFields(req, res, next){
    const props = {
        name: 'nombre_obligatorio',
        surnames: 'apellido_obligatorio',
        email: 'email_obligatorio',
        password: 'contrasena_obligatoria'
    }
    verify(req, res, next, props);
}

module.exports = {
    verifyCreateCommentFields,
    verifyUpdateSpotState,
    verifyCreatePaymentFields,
    verifyCreateSpotFields,
    verifyUpdateSpotFields,
    verifyCreateStationFields,
    verifyUpdateStationFields,
    verifyCreateUserFields,
    verifyUpdateUserFields
}