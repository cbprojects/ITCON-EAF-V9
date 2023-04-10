import { Injectable } from '@angular/core';
import { ObjectModelInitializer } from './ObjectModelInitializer';


@Injectable()
export class TextProperties {

  constructor(public objectModelInitializer: ObjectModelInitializer) {
  }

  getProperties(idioma) {
    let constant = this.objectModelInitializer.getConst();
    return {
      // Labels
      lbl_summary_info: idioma === constant.idiomaEs ? '¡Información!' : 'Info!',
      lbl_summary_success: idioma === constant.idiomaEs ? '¡Exitoso!' : 'Success!',
      lbl_summary_warning: idioma === constant.idiomaEs ? '¡Advertencia!' : 'Warning!',
      lbl_summary_danger: idioma === constant.idiomaEs ? '¡Error!' : 'Error!',
      lbl_summary_unknown_danger: idioma === constant.idiomaEs ? '¡Error Desconocido!' : 'Unknown Error!',
      lbl_detail_fue: idioma === constant.idiomaEs ? ' fue ' : ' has ',
      lbl_detail_el_registro: idioma === constant.idiomaEs ? 'El elemento #' : 'The element #',
      lbl_detail_el_registro_eliminado: idioma === constant.idiomaEs ? 'El elemento fue eliminado satisfactoriamente.' : 'The element was deleted successfully.',
      lbl_detail_creado: idioma === constant.idiomaEs ? 'creado' : 'created',
      lbl_detail_actualizado: idioma === constant.idiomaEs ? 'actualizado' : 'updated',
      lbl_detail_satisfactoriamente: idioma === constant.idiomaEs ? ' satisfactoriamente.' : ' successfully.',

      // Generales
      lbl_login: idioma === constant.idiomaEs ? 'Login' : 'Login',
      lbl_categorias: idioma === constant.idiomaEs ? 'Categorías' : 'Categories',
      lbl_register: idioma === constant.idiomaEs ? 'Registro' : 'Register',
      lbl_posts_populares: idioma === constant.idiomaEs ? 'Posts Populares' : 'Populare Posts',
      lbl_colaboradores: idioma === constant.idiomaEs ? 'Colaboradores' : 'Collaborators',
      lbl_colaboradores_resume: idioma === constant.idiomaEs ? 'Ellos también hacen parte de este duro trabajo' : 'They are also part of this hard work',
      lbl_bienvenido: idioma === constant.idiomaEs ? 'Bienvenido' : 'Welcome',
      lbl_info_sin_resultados: idioma === constant.idiomaEs ? 'Sin Resultados' : 'Without Results',
      lbl_info_fallo_conectar_base_datos: idioma === constant.idiomaEs ? 'No hay Conexión a la Base de Datos' : 'Without Conection to Data Base',
      lbl_info_cargando_resultados: idioma === constant.idiomaEs ? 'Cargando Resultados' : 'Loading Results',
      lbl_info_proceso_completo: idioma === constant.idiomaEs ? 'Proceso realizado Satisfactoriamente' : 'Process Complete',
      lbl_error_403: idioma === constant.idiomaEs ? '403' : '403',
      lbl_error_404: idioma === constant.idiomaEs ? '404' : '404',
      lbl_error_500: idioma === constant.idiomaEs ? '500' : '500',
      lbl_mensaje_error_404: idioma === constant.idiomaEs ? 'La página que busca no ha sido encontrada.' : 'Page Not Found.',
      lbl_oops: idioma === constant.idiomaEs ? '¡Oops!' : 'Oops!',
      lbl_vencimiento_token_sesion: idioma === constant.idiomaEs ? 'Fecha de Vencimiento del Token: ' : 'Token Expiration Date',
      lbl_vcode_expiro: idioma === constant.idiomaEs ? 'El Código de Verificación ya expiró.' : 'The Verification Code has expired.',
      lbl_ir_a: idioma === constant.idiomaEs ? 'Ir a: ' : 'Go to: ',
      lbl_ir_inicio: idioma === constant.idiomaEs ? 'Ir al Login' : 'Go to Login',
      lbl_recuerdame: idioma === constant.idiomaEs ? 'Recuérdame' : 'Remember me',
      lbl_envia_nueva_clave: idioma === constant.idiomaEs ? 'Envíame una nueva contraseña' : 'Send me new password',
      lbl_olvidalo: idioma === constant.idiomaEs ? 'Olvídalo, ' : 'Forget it, ',
      lbl_enviame_atras: idioma === constant.idiomaEs ? 'envíame de nuevo' : 'send me back',
      lbl_a_pantalla_ingreso: idioma === constant.idiomaEs ? ' a la pantalla de ingreso.' : ' to the sign in screen.',
      lbl_btn_olvidaste_tu_clave: idioma === constant.idiomaEs ? '¿Olvidaste tu clave?' : 'Do You forget your password?',
      lbl_btn_reset_pass: idioma === constant.idiomaEs ? 'Digita tu usuario y una clave será enviada a tu email registrado.' : 'Enter your user and your password will be reset and emailed to you.',
      lbl_btn_no_ha_llegado_correo_vcode: idioma === constant.idiomaEs ? '¿No ha llegado ningún Correo? Presiona para Reintentar.' : 'No mail has arrived? Press to Retry.',
      lbl_drag_archivos: idioma === constant.idiomaEs ? 'Haga [Clic] o arrastre un archivo aquí' : 'Click or Drag a file here',
      lbl_cantidad_max_archivos: idioma === constant.idiomaEs ? 'Cantidad máxima: 5 archivos' : 'Only 5 Files',
      lbl_registro_ingreso: idioma === constant.idiomaEs ? 'Registro/Ingreso' : 'Register/Login',
      lbl_por_definir: idioma === constant.idiomaEs ? 'Por definir' : 'To define',
      lbl_inicio: idioma === constant.idiomaEs ? 'Inicio' : 'Start',
      lbl_resumen: idioma === constant.idiomaEs ? 'Resumen' : 'Resume',
      lbl_actualizado_ahora: idioma === constant.idiomaEs ? 'Actualizado ahora' : 'Just updated',
      lbl_leer_mas: idioma === constant.idiomaEs ? 'Leer Más...' : 'Read more...',
      lbl_llenar_datos: idioma === constant.idiomaEs ? 'Debe suministrar toda la información requerida' : 'You must supply all the required information',
      lbl_msg_claves_no_coinciden: idioma === constant.idiomaEs ? 'Las claves no coinciden' : 'Passwords do not match',

      // Banda
      lbl_banda: idioma === constant.idiomaEs ? 'Banda' : 'Band',
      lbl_banda_frenetico_rock_and_roll: idioma === constant.idiomaEs ? 'Frenético Rock and Roll' : 'Frenzy Rock and Roll',
      lbl_banda_descripcion_demo: idioma === constant.idiomaEs ? 'Este es el primer Demo de la banda. Temática de metamorfosis en el pensamiento crítico y en la influencia musical en la vida diaria. Esto es dedicado a todas esas personas que quieren descansar, pero no lo pueden expresar: ¡Eutanasia Para Todos!' : 'This is the first demo of the band. Metamorphosis theme in critical thinking and musical influence on daily life. This is dedicated to all those people who want to rest, but cannot express it: Eutanasia for All!',
      lbl_banda_demo_1: idioma === constant.idiomaEs ? 'Ya es tarde' : 'Ya es tarde',
      lbl_banda_demo_2: idioma === constant.idiomaEs ? 'Buscando identidad' : 'Buscando identidad',
      lbl_banda_demo_3: idioma === constant.idiomaEs ? 'Prestigio fatal' : 'Prestigio fatal',
      lbl_banda_demo_4: idioma === constant.idiomaEs ? 'De vuelta al infierno' : 'De vuelta al infierno',
      lbl_banda_demo_5: idioma === constant.idiomaEs ? 'No moriré' : 'No moriré',
      lbl_banda_pedro: idioma === constant.idiomaEs ? 'Pedro Sánchez' : 'Pedro Sánchez',
      lbl_banda_pipe: idioma === constant.idiomaEs ? 'Andrés Sánchez' : 'Andrés Sánchez',
      lbl_banda_leo: idioma === constant.idiomaEs ? 'Leo Navarro' : 'Leo Navarro',
      lbl_banda_carlos: idioma === constant.idiomaEs ? 'Carlos Baene' : 'Carlos Baene',
      lbl_banda_vocalista: idioma === constant.idiomaEs ? 'Vocalista' : 'Vocalist',
      lbl_banda_guitarrista: idioma === constant.idiomaEs ? 'Guitarrista' : 'Guitarist',
      lbl_banda_bajista: idioma === constant.idiomaEs ? 'Bajista' : 'Bassist',
      lbl_banda_baterista: idioma === constant.idiomaEs ? 'Baterista' : 'Drummer',
      lbl_banda_carlos_jacome: idioma === constant.idiomaEs ? 'Carlos Jácome' : 'Carlos Jácome',
      lbl_banda_guardia_estudio: idioma === constant.idiomaEs ? 'La Guardia Estudio' : 'La Guardia Estudio',
      lbl_banda_resena_carlos_jacome: idioma === constant.idiomaEs ? 'Apasionado por la música, el arte y el diseño, me he desempeñado profesionalmente en Agencias de Publicidad & Diseño y en la parte académica como docente, trabajos de ilustración para portadas de cds, libros, revistas, proyectos de identidad gráfica corporativa y diseño editorial.' : 'Passionate about music, art and design, I have worked professionally in Advertising & Design Agencies and in the academic part as a teacher, illustration work for CD covers, books, magazines, corporate graphic identity projects and editorial design.',
      lbl_banda_ayuda_compartir: idioma === constant.idiomaEs ? 'Ayúdanos a compartir nuestra música a todo el mundo' : 'Help us share our music with everyone',

      // Mensajes
      lbl_mensaje_archivo_subido: idioma === constant.idiomaEs ? 'Archivo(s) subido correctamente.' : 'File(s) uploaded successfully.',
      lbl_mensaje_cant_archivos_permitidos: idioma === constant.idiomaEs ? 'La cantidad de archivos por subir supera la cantidad permitida.' : 'The number of files to upload exceeds the allowed number.',
      lbl_mensaje_cant_archivos_permitidos_detalle: idioma === constant.idiomaEs ? 'Máximo {0} archivo(s).' : 'Limit is {0} at most.',
      lbl_mensaje_dropzone_principal: idioma === constant.idiomaEs ? 'Esta es una zona de carga de archivos' : 'This is a file upload area.',
      lbl_mensaje_dropzone_secundario: idioma === constant.idiomaEs ? 'Arrastre su archivo o dé [Clic] para subir uno desde el explorador de archivos' : 'Drag your file or Click to upload one from file explorer.',
      lbl_mensaje_size_archivos_permitidos: idioma === constant.idiomaEs ? 'Error con el tamaño del archivo: ' : 'File size error: ',
      lbl_mensaje_size_archivos_permitidos_detalle: idioma === constant.idiomaEs ? 'El tamaño del archivo excede lo permitido. El máximo es ' : 'The file size exceeds what is allowed. Maximum upload size is ',
      lbl_mensaje_tipo_archivos_permitidos_generico: idioma === constant.idiomaEs ? 'El tipo del archivo o elemento no es permitido.' : 'The file or element type is not allowed.',
      lbl_mensaje_tipo_archivos_permitidos: idioma === constant.idiomaEs ? 'Error con el tipo del archivo: ' : 'File type error: ',
      lbl_mensaje_tipo_archivos_permitidos_detalle: idioma === constant.idiomaEs ? 'El tipo del archivo no es permitido. Se permiten {0}.' : 'The file type is not allowed. Allowed file types {0}.',
      lbl_mensaje_archivo_no_subido: idioma === constant.idiomaEs ? 'El archivo no pudo ser procesado.' : 'The file could not be processed.',
      lbl_mensaje_seleccione_archivo_para_subir: idioma === constant.idiomaEs ? 'Seleccione un archivo.' : 'Select a file.',
      lbl_mensaje_no_conexion_servidor: idioma === constant.idiomaEs ? 'No se ha podido establecer la conexión con el Servidor en algun proceso interno' : 'The connection to the Server could not be established in some internal process',
      lbl_mensaje_login_invalido: idioma === constant.idiomaEs ? 'El Usuario y/o la Contraseña son incorrectos' : 'The User and/or Password are incorrect',
      lbl_mensaje_sin_detalles_error: idioma === constant.idiomaEs ? 'No hay detalles del error' : 'No error details',
      lbl_mensaje_error_403_ingresar_ruta: idioma === constant.idiomaEs ? 'Está intentando ingresar a la ruta: ' : '',
      lbl_mensaje_error_403_no_permisos: idioma === constant.idiomaEs ? 'No cuenta con permisos para visualizar el contenido.' : 'You do not have permissions to view its content.',
      lbl_mensaje_error_403_sesion_expirada: idioma === constant.idiomaEs ? 'Su sesión ha expirado. Debe ingresar de nuevo a la aplicación.' : 'Your session has expired. You must enter the application again.',
      lbl_mensaje_error_500_no_sesion: idioma === constant.idiomaEs ? 'No tiene una Sesión Iniciada.' : 'You dont have a session started.',

      // Modales
      lbl_info_titulo_modal_error: idioma === constant.idiomaEs ? 'ERROR' : 'ERROR',
      lbl_info_titulo_modal_informacion: idioma === constant.idiomaEs ? 'INFORMACION' : 'INFORMATION',
      lbl_info_titulo_modal_advertencia: idioma === constant.idiomaEs ? 'ADVERTECNIA' : 'WARNING',
      lbl_info_titulo_modal_proceso_exitoso: idioma === constant.idiomaEs ? 'PROCESO EXITOSO' : 'PROCESS COMPLETE',

      // Steps
      lbl_info_titulo_step_personal: idioma === constant.idiomaEs ? 'PERSONAL' : 'PERSONAL',
      lbl_info_titulo_step_identificacion: idioma === constant.idiomaEs ? 'IDENTIFICACIÓN' : 'IDENTIFICATION',
      lbl_info_titulo_step_seguridad: idioma === constant.idiomaEs ? 'SEGURIDAD' : 'SECURITY',
      lbl_info_titulo_step_confirmacion: idioma === constant.idiomaEs ? 'CONFIRMACION' : 'CONFIRMATION',

      // Menu
      lbl_menu_inicio: idioma === constant.idiomaEs ? 'Inicio' : 'Home',
      lbl_menu_gestion: idioma === constant.idiomaEs ? 'Gestión' : 'Management',
      lbl_menu_consulta: idioma === constant.idiomaEs ? 'Consulta' : 'Query',
      lbl_menu_reportes: idioma === constant.idiomaEs ? 'Reportes' : 'Reports',
      lbl_menu_ubicaciones: idioma === constant.idiomaEs ? 'Ubicaciones' : 'Locations',
      lbl_menu_notificaciones: idioma === constant.idiomaEs ? 'Notificaciones' : 'Notifications',

      // Acciones
      lbl_btn_ingresar: idioma === constant.idiomaEs ? 'Ingresar' : 'Sign In',
      lbl_btn_registrarse: idioma === constant.idiomaEs ? 'Registrarse' : 'Register',
      lbl_btn_reset_password: idioma === constant.idiomaEs ? 'Reestablecer Contraseña' : 'Reset Password',
      lbl_btn_inicio: idioma === constant.idiomaEs ? 'Inicio' : 'Login',
      lbl_btn_buscar: idioma === constant.idiomaEs ? 'Buscar' : 'Search',
      lbl_btn_consultar: idioma === constant.idiomaEs ? 'Consultar' : 'Query',
      lbl_btn_crear: idioma === constant.idiomaEs ? 'Crear' : 'Create',
      lbl_btn_eliminar: idioma === constant.idiomaEs ? 'Eliminar' : 'Delete',
      lbl_btn_editar: idioma === constant.idiomaEs ? 'Editar' : 'Edit',
      lbl_btn_limpiar: idioma === constant.idiomaEs ? 'Limpiar' : 'Clean',
      lbl_btn_atras: idioma === constant.idiomaEs ? 'Atrás' : 'Back',
      lbl_btn_masivo: idioma === constant.idiomaEs ? 'Masivo' : 'Masive',
      lbl_btn_exportar: idioma === constant.idiomaEs ? 'Exportar' : 'Export',
      lbl_btn_importar: idioma === constant.idiomaEs ? 'Importar' : 'Import',
      lbl_btn_actualizar: idioma === constant.idiomaEs ? 'Actualizar' : 'Update',
      lbl_btn_guardar: idioma === constant.idiomaEs ? 'Guardar' : 'Save',
      lbl_btn_ite_remover: idioma === constant.idiomaEs ? 'Remover' : 'Remove',
      lbl_btn_ite_agregar: idioma === constant.idiomaEs ? 'Agregar' : 'Add',
      lbl_btn_siguiente: idioma === constant.idiomaEs ? 'Siguiente' : 'Next',
      lbl_btn_anterior: idioma === constant.idiomaEs ? 'Anterior' : 'Back',
      lbl_btn_cancelar: idioma === constant.idiomaEs ? 'Cancelar' : 'Cancel',
      lbl_btn_subir: idioma === constant.idiomaEs ? 'Subir' : 'Upload',
      lbl_btn_escoger: idioma === constant.idiomaEs ? 'Escoger' : 'Choose',
      lbl_btn_escoger_archivo: idioma === constant.idiomaEs ? 'Escoger Archivo' : 'Choose File',
      lbl_subir_archivos: idioma === constant.idiomaEs ? 'Subir Archivos' : 'Upload Files',

      // Header
      lbl_header_usuario: idioma === constant.idiomaEs ? 'Usuario' : 'User',
      lbl_header_correo: idioma === constant.idiomaEs ? 'Correo' : 'E-Mail',
      lbl_header_correo_invalido: idioma === constant.idiomaEs ? 'Correo Inválido' : 'Invalid E-Mail',
      lbl_header_password: idioma === constant.idiomaEs ? 'Clave' : 'Password',
      lbl_header_confirmar_password: idioma === constant.idiomaEs ? 'Confirmar Clave' : 'Confirm Password',
      lbl_header_nombre: idioma === constant.idiomaEs ? 'Nombre' : 'Name',
      lbl_header_inicio: idioma === constant.idiomaEs ? 'Inicio' : 'Home',
      lbl_header_acerca_de: idioma === constant.idiomaEs ? 'Acerca de' : 'About',
      lbl_header_servicios: idioma === constant.idiomaEs ? 'Servicios' : 'Services',
      lbl_header_portafolio: idioma === constant.idiomaEs ? 'Portafolio' : 'Portfolio',
      lbl_header_precios: idioma === constant.idiomaEs ? 'Precios' : 'Pricing',
      lbl_header_contacto: idioma === constant.idiomaEs ? 'Contacto' : 'Contact',

      // Home
      lbl_home_yo: idioma === constant.idiomaEs ? 'Este soy Yo' : 'This is Me',
      lbl_home_descubre: idioma === constant.idiomaEs ? 'Descubre Ahora' : 'Discover Now',
      lbl_home_slogan: idioma === constant.idiomaEs ? 'Tuvimos que estar separados mucho tiempo, es hora de volver a juntarnos. ¿Querés mostrar tu talento, promocionar tus servicios/productos o proyectar tu empresa sin descuidar el aspecto visual? ¡Todo al alcance de todos! Te invito a conocer mi trabajo.' : 'We had to be apart for a long time, it is time to get back together. Do you want to show your talent, promote your services/products or project your company without neglecting the visual aspect? Everything within everyone is reach! I invite you to know my work.',
      lbl_home_acerca_de_mi: idioma === constant.idiomaEs ? 'Acerca de Mí' : 'About Me',
      lbl_home_detalles_personales: idioma === constant.idiomaEs ? 'Detalles' : 'Details',
      lbl_home_acerca_de_mi_resumen: idioma === constant.idiomaEs ? 'Soy una persona creativa, dispuesto a asumir nuevos retos. Además de mis habilidades como Desarrollador de Software, tengo experiencia en apoyo a pequeñas y grandes empresas en gestión de proyectos, documentación y análisis de requerimientos, gestión de servicios y despliegues para paso a producción de aplicaciones en servidores de Oracle - WebLogic. También, he desempeñado el rol de analista de proyectos de investigación y apoyo en capacitación tecnológica y gestión en el área de Marketing Digital.' : 'I am a creative person, willing to take on new challenges. Besides my skills as a Software Developer, I have experience in supporting small and large companies in managing projects, documentation and requirements analysis, service management and deployments for the transition to production of applications on Oracle servers - WebLogic. Also, he played the role of project analyst research and support in technological training and management in the area of Digital marketing.',
      lbl_home_detalles_personales_1: idioma === constant.idiomaEs ? 'En estos tiempos nos enfrentamos a una avalancha de situaciones difíciles, grandes y pequeñas. Sin embargo, esta es la oportunidad para aprovecharlas tecnologías y por medio de un sistema puedas alcanzar mejores nivelesde productividad y llegar a más personas para que conozcan tu negocio.' : 'In these times we are faced with an avalanche of difficult situations, big and small. However, this is the opportunity to take advantage of technologies and through a system to achieve better levels of productivity and reach more people to get to know your business.',
      lbl_home_detalles_personales_2: idioma === constant.idiomaEs ? 'CBaeneProjects, se presenta como un aliado para que puedas seguir con tus ideas. Trabajamos con empresas y profesionales de todos los sectores yentrevistamos a miles de clientes para comprender sus necesidades.' : 'CBaeneProjects, is presented as an ally so that you can continue with your ideas. We work with companies and professionals from all sectors and interview thousands of clients to understand their needs.',
      lbl_home_detalles_personales_3: idioma === constant.idiomaEs ? 'Hemos aprendido a adaptarnos y es hora de evolucionar con las necesidadesde los clientes. Gracias a las tecnologías adaptativas para que tus servicios/productos puedan visualizarse desde cualquier dispositivopodemos trabajar impulsando tu negocio hasta cada rincón del planeta.' : 'We have learned to adapt and it is time to evolve with customer needs. Thanks to adaptive technologies so that your services / products can be viewed from any device, we can work to boost your business to every corner of the planet.',
      lbl_home_ver_detalles: idioma === constant.idiomaEs ? 'Ver Detalles' : 'View Details',
      lbl_home_servicios_ofrecidos: idioma === constant.idiomaEs ? 'Mis Servicios Ofrecidos' : 'My Offered Services',
      lbl_home_servicios_ofrecidos_resumen: idioma === constant.idiomaEs ? 'En mi experiencia laboral he podido desarrollar el conocimiento en distintas áreas tecnológicas. Soy desarrollador FullStack.' : 'In my work experience I have been able to develop knowledge in different technological areas. I am a FullStack developer.',
      lbl_home_servicio_diseno_web: idioma === constant.idiomaEs ? 'Diseño Web' : 'Web Design',
      lbl_home_servicio_desarrollo_web: idioma === constant.idiomaEs ? 'Desarrollo Web' : 'Web Development',
      lbl_home_servicio_gestion_bd: idioma === constant.idiomaEs ? 'Bases de Datos' : 'Databases',
      lbl_home_servicio_microservicios: idioma === constant.idiomaEs ? 'Microservicios' : 'Microservices',
      lbl_home_servicio_responsive: idioma === constant.idiomaEs ? 'Responsive' : 'Responsive',
      lbl_home_servicio_gestion_proyectos: idioma === constant.idiomaEs ? 'Gestión de Proyectos' : 'Projects management',
      lbl_home_counter_1: idioma === constant.idiomaEs ? 'Proyectos Completados' : 'Projects Completed',
      lbl_home_counter_2: idioma === constant.idiomaEs ? 'Años de Experiencia' : 'Years of Experience',
      lbl_home_counter_3: idioma === constant.idiomaEs ? 'Clientes Satisfechos' : 'Happy Clients',
      lbl_home_counter_4: idioma === constant.idiomaEs ? 'Trabajo Independiente' : 'Freelance Work',
      lbl_home_proyectos_destacados: idioma === constant.idiomaEs ? 'Últimos Proyectos Destacados' : 'Latest Featured Projects',
      lbl_home_proyectos_destacados_resume: idioma === constant.idiomaEs ? 'Quiero compartir mis últimos trabajos para que visiten' : 'I want to share my latest work for you to visit',
      lbl_home_proyectos_todos: idioma === constant.idiomaEs ? 'Todos' : 'All',
      lbl_home_proyectos_full: idioma === constant.idiomaEs ? 'Páginas Web Completas' : 'Full Page Web',
      lbl_home_proyectos_template: idioma === constant.idiomaEs ? 'Plantillas' : 'Templates',
      lbl_home_proyectos_web: idioma === constant.idiomaEs ? 'Páginas Web' : 'Web Pages',
      lbl_home_proyectos_qr: idioma === constant.idiomaEs ? 'Menú QR' : 'QR Menu',
      lbl_home_escoge_plan: idioma === constant.idiomaEs ? 'Escoge Tu Plan' : 'Choose Your Plan',
      lbl_home_escoge_plan_resume: idioma === constant.idiomaEs ? 'Te brindo varias opciones de acuerdo a tus necesidades' : 'I offer you several options according to your needs',
      lbl_home_a_partir_de: idioma === constant.idiomaEs ? 'A partir de' : 'Since',
      lbl_home_compra_ahora: idioma === constant.idiomaEs ? 'Compra ahora' : 'Buy now',
      lbl_plan_1: idioma === constant.idiomaEs ? 'Económica' : 'Economy',
      lbl_plan_1_para: idioma === constant.idiomaEs ? 'Para promocionar servicios y eventos' : 'To promote services and events',
      lbl_plan_2: idioma === constant.idiomaEs ? 'Negocios' : 'Business',
      lbl_plan_2_para: idioma === constant.idiomaEs ? 'Para proyectar personas y negocios' : 'To project people and businesses',
      lbl_plan_3: idioma === constant.idiomaEs ? 'Premium' : 'Premium',
      lbl_plan_3_para: idioma === constant.idiomaEs ? 'Para pequeñas y medianas empresas' : 'For small and medium businesses',
      lbl_plan_4: idioma === constant.idiomaEs ? 'Exclusivo' : 'Exclusive',
      lbl_plan_4_para: idioma === constant.idiomaEs ? 'Sistemas complejos para grandes empresas' : 'Complex systems for large companies',

      lbl_home_newsletter_title: idioma === constant.idiomaEs ? 'Boletín Informativo' : 'Newsletter',
      lbl_home_newsletter: idioma === constant.idiomaEs ? 'Mantente actualizado con nuestras últimas ofertas' : 'Stay up to date with our latest offers',
      lbl_home_follow_me_title: idioma === constant.idiomaEs ? 'Sígueme' : 'Follow Me',
      lbl_home_social: idioma === constant.idiomaEs ? 'En redes sociales' : 'In social networks',

      //Tables Headers
      lbl_table_header_nombre_empresa: idioma === constant.idiomaEs ? 'Empresa' : 'Company',
      lbl_table_header_telefono_empresa: idioma === constant.idiomaEs ? 'Teléfono Empresa' : 'Company Telephone',
      lbl_table_header_descripcion_empresa: idioma === constant.idiomaEs ? 'Descripción Empresa' : 'Company Description',
      lbl_table_header_nombre_contacto: idioma === constant.idiomaEs ? 'Contacto' : 'Contact',
      lbl_table_header_correo_contacto: idioma === constant.idiomaEs ? 'Correo Contacto' : 'Contact E-Mail',
      lbl_table_header_cargo_contacto: idioma === constant.idiomaEs ? 'Cargo Contacto' : 'Contact Position',
      lbl_table_header_telefono_contacto: idioma === constant.idiomaEs ? 'Teléfono Contacto' : 'Contact Telephone',
      lbl_table_header_proceso: idioma === constant.idiomaEs ? 'Proceso' : 'Process',

      // Titles
      lbl_mtto_consulta: idioma === constant.idiomaEs ? 'Consulta' : 'Query',
      lbl_mtto_creacion_edicion: idioma === constant.idiomaEs ? 'Creación/Edición' : 'Create/Edit',

      // Tooltips
      lbl_tip_cerrar_sesion: idioma === constant.idiomaEs ? 'Cerrar Sesión' : 'End Session',
      lbl_tip_agregar: idioma === constant.idiomaEs ? '[Clic] para agregar un nuevo registro' : 'Click to add a new register',
      lbl_tip_editar: idioma === constant.idiomaEs ? '[Clic] para editar registro' : 'Click to edit the register selected',
      lbl_tip_eliminar: idioma === constant.idiomaEs ? '[Clic] para eliminar registro' : 'Click to delete the register selected',
      lbl_tip_buscar: idioma === constant.idiomaEs ? '[Clic] para buscar registros' : 'Click to search registers',
      lbl_tip_limpiar: idioma === constant.idiomaEs ? '[Clic] para limpiar' : 'Click to clean',
      lbl_tip_anterior: idioma === constant.idiomaEs ? '[Clic] para regresar' : 'Click to go back',
      lbl_tip_actualizar: idioma === constant.idiomaEs ? '[Clic] para actualizar' : 'Click to update',
      lbl_tip_guardar: idioma === constant.idiomaEs ? '[Clic] para guardar' : 'Click to save',
      lbl_tip_exportar_datos: idioma === constant.idiomaEs ? '[Clic] para exportar' : 'Click to export',
      lbl_tip_subir_archivos: idioma === constant.idiomaEs ? '[Clic] para subir archivos' : 'Click to upload files',
      lbl_tip_eliminar_archivo: idioma === constant.idiomaEs ? '[Clic] para eliminar archivo' : 'Click to delete file',
      lbl_tip_mostrar_ocultar_archivos: idioma === constant.idiomaEs ? '[Clic] para mostrar/ocultar archivos' : 'Click to show/hide files',
      lbl_tip_ir_prestamos: idioma === constant.idiomaEs ? '[Clic] para ir a Préstamos' : 'Click to go to Loans',

      //Enums
      lbl_enum_generico_valor_vacio: idioma === constant.idiomaEs ? 'Selecciona una opción' : 'Select a Item',

      lbl_enum_si: idioma === constant.idiomaEs ? 'Si' : 'Yes',
      lbl_enum_no: idioma === constant.idiomaEs ? 'No' : 'No',

      lbl_enum_activo: idioma === constant.idiomaEs ? 'Activo' : 'Active',
      lbl_enum_inactivo: idioma === constant.idiomaEs ? 'Inactivo' : 'Inactive',

      lbl_enum_todos: idioma === constant.idiomaEs ? 'Todos' : 'All',
      lbl_enum_aprobado: idioma === constant.idiomaEs ? 'Aprobado' : 'approved',
      lbl_enum_noAprobado: idioma === constant.idiomaEs ? 'No Aprobado' : 'Not approved',

      lbl_enum_sexo_valor_masculino: idioma === constant.idiomaEs ? 'Masculino' : 'Man',
      lbl_enum_sexo_valor_femenino: idioma === constant.idiomaEs ? 'Femenino' : 'Femenino',
      lbl_enum_sexo_valor_ambos: idioma === constant.idiomaEs ? 'Ambos' : 'Ambos',

      lbl_enum_tipo_usuario_valor_cliente: idioma === constant.idiomaEs ? 'Cliente' : 'Client',
      lbl_enum_tipo_usuario_valor_empleado: idioma === constant.idiomaEs ? 'Empleado' : 'Employed',
      lbl_enum_tipo_usuario_valor_administrador: idioma === constant.idiomaEs ? 'Administrador' : 'Admin',

      lbl_enum_tipo_documento_valor_cc: idioma === constant.idiomaEs ? 'CC' : 'CC',
      lbl_enum_tipo_documento_valor_ti: idioma === constant.idiomaEs ? 'TI' : 'TI',
      lbl_enum_tipo_documento_valor_ce: idioma === constant.idiomaEs ? 'CE' : 'CE',

      lbl_enum_tipo_ubicacion_valor_pais: idioma === constant.idiomaEs ? 'País' : 'Country',
      lbl_enum_tipo_ubicacion_valor_departamento: idioma === constant.idiomaEs ? 'Departamento/Región/Estado' : 'Department/Region/State',
      lbl_enum_tipo_ubicacion_valor_ciudad: idioma === constant.idiomaEs ? 'Ciudad' : 'City',

      lbl_enum_proceso_contacto_valor_seleccione: idioma === constant.idiomaEs ? 'Seleccione un proceso' : 'Choose a proccess',
      lbl_enum_proceso_contacto_valor_prospecto: idioma === constant.idiomaEs ? 'Prospecto' : 'Prospect',
      lbl_enum_proceso_contacto_valor_contacto: idioma === constant.idiomaEs ? 'Contacto' : 'Contact',
      lbl_enum_proceso_contacto_valor_cliente: idioma === constant.idiomaEs ? 'Cliente' : 'Customer',
      lbl_enum_proceso_contacto_valor_cliente_perdido: idioma === constant.idiomaEs ? 'Cliente Perdido' : 'Lost Customer',
      lbl_enum_proceso_contacto_valor_potencial_perdida: idioma === constant.idiomaEs ? 'Potencial Pérdida' : 'Lost Potential',
      lbl_enum_proceso_contacto_valor_cambio_info: idioma === constant.idiomaEs ? 'Cambio Info.' : 'Change Info.',

      // Mtto Contacto
      lbl_mtto_id_contacto: idioma === constant.idiomaEs ? 'ID Contacto' : 'Contact ID',
      lbl_mtto_nombre_empresa: idioma === constant.idiomaEs ? 'Empresa' : 'Company',
      lbl_mtto_telefono_empresa: idioma === constant.idiomaEs ? 'Teléfono Empresa' : 'Company Telephone',
      lbl_mtto_descripcion_empresa: idioma === constant.idiomaEs ? 'Descripción Empresa' : 'Company Description',
      lbl_mtto_nombre_contacto: idioma === constant.idiomaEs ? 'Contacto' : 'Contact',
      lbl_mtto_correo_contacto: idioma === constant.idiomaEs ? 'Correo Contacto' : 'Contact E-Mail',
      lbl_mtto_cargo_contacto: idioma === constant.idiomaEs ? 'Cargo Contacto' : 'Contact Position',
      lbl_mtto_telefono_contacto: idioma === constant.idiomaEs ? 'Teléfono Contacto' : 'Contact Telephone',
      lbl_mtto_proceso: idioma === constant.idiomaEs ? 'Proceso' : 'Process',

      lbl_perfil_codigo: idioma === constant.idiomaEs ? 'Código' : 'Code',
      lbl_rol_perfil_consulta: idioma === constant.idiomaEs ? 'Consulta de Rol-Perfil' : 'Search by Role-Profile ',
      lbl_perfil_descripcion: idioma === constant.idiomaEs ? 'Descripción' : 'Description',
      lbl_perfil_id: idioma === constant.idiomaEs ? 'ID' : 'ID',
      lbl_perfil_estado: idioma === constant.idiomaEs ? 'Estado' : 'Status',
      lbl_resultado: idioma === constant.idiomaEs ? 'Resultados' : 'Results',
      lbl_rol_perfil_disponible: idioma === constant.idiomaEs ? 'Disponible' : 'Available',
      lbl_rol_perfil_seleccionado: idioma === constant.idiomaEs ? 'Seleccionado' : 'Select',
      lbl_rol_perfil_busqueda: idioma === constant.idiomaEs ? 'Busqueda por código' : 'Search by code',

      lbl_traslado_unidad_documental: idioma === constant.idiomaEs ? 'Traslado Unidad Documental' : 'Documentary Unit Transfer',
      lbl_traslado_unidad_documental_caja_origen: idioma === constant.idiomaEs ? 'Caja Origen' : 'Source Box',
      lbl_traslado_unidad_documental_caja_destino: idioma === constant.idiomaEs ? 'Caja Destino' : 'Target Box',
      lbl_caja_repetida: idioma === constant.idiomaEs ? 'Por favor escoger dos cajas diferentes' : 'Please choose two different boxes',

      lbl_digitalizar_unidad_documental: idioma === constant.idiomaEs ? 'Digitalizar Unidad Documental' : 'Documentary Unit Digitalize',
      lbl_sociedad_obligatorio: idioma === constant.idiomaEs ? 'Por favor seleccionar una sociedad' : 'Please choose a society',

      //Usuario
      lbl_validar_contrasena: idioma === constant.idiomaEs ? 'Contraseña incorrecta' : 'Password incorrect',
      lbl_validar_tipoDoc: idioma === constant.idiomaEs ? 'Tipo documento vacío' : 'empty type document',
      lbl_validar_documento: idioma === constant.idiomaEs ? 'Documento vacío' : 'empty document',
      lbl_validar_nombre: idioma === constant.idiomaEs ? 'Nombre vacío' : 'empty name',
      lbl_validar_celular: idioma === constant.idiomaEs ? 'Celular vacío' : 'empty cellphone',
      lbl_validar_direccion: idioma === constant.idiomaEs ? 'Dirección vacío' : 'empty address',
      lbl_validar_email: idioma === constant.idiomaEs ? 'Email vacío' : 'empty email',
      lbl_validar_contrasenaVacia: idioma === constant.idiomaEs ? 'Contraseña vacía' : 'empty password',
      lbl_validar_confirContrasena: idioma === constant.idiomaEs ? 'Confirmar contraseña vacía' : 'empty confirm password',
      lbl_validar_perfil: idioma === constant.idiomaEs ? 'Perfil vacío' : 'Profile email',
      lbl_validar_estado: idioma === constant.idiomaEs ? 'Estado vacío' : 'State email',
      // Login
      lbl_login_welcome: idioma === constant.idiomaEs ? 'Ingresa a tu cuenta' : 'Login to your account',

      // Recuperar contraseña
      lbl_sugerencia: idioma === constant.idiomaEs ? 'Sugerencias' : 'Suggestions',
      lbl_unaMinus: idioma === constant.idiomaEs ? 'Al menos una minúscula' : 'At least one lowercase',
      lbl_unaMayus: idioma === constant.idiomaEs ? 'Al menos una mayúscula' : 'At least one uppercase',
      lbl_unNume: idioma === constant.idiomaEs ? 'Al menos un número' : 'At least one numeric',
      lbl_ochoCaract: idioma === constant.idiomaEs ? 'Mínimo 8 caracteres' : 'Minimum 8 characters',
    }
  };
}