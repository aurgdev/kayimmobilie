function get_manufacturer_info_window_return(str)
{
	$('html').append(str);
}

function lock_products(pid)
  {
	agent.call('','lock_products','lock_products_return', pid);
	}


function lock_products_return(str) {
	var tab = str.split('||') ;
  if(document.getElementById('cartcontentcount'))
	 document.getElementById('cartcontentcount').innerHTML = tab[0];
  if(document.getElementById('cartcontent'))
	 document.getElementById('cartcontent').innerHTML = tab[1];
}

function unlock_products(pid)
  {
	agent.call('','unlock_products','unlock_products_return', pid);
	}


function unlock_products_return(str) {
	var tab = str.split('||') ;
	document.getElementById('cartcontentcount').innerHTML = tab[0];
	document.getElementById('cartcontent').innerHTML = tab[1];
}

function update_secteurs()
  	{
	agent.call('','find_criteres_dependance','update_secteurs_return', document.quick_find.C_65.value);
	}

function update_secteurs_return(str) {
	document.getElementById('show_secteurs').innerHTML = str;
	}

function update_ville(agence)
  	{
	agent.call('','find_ville','update_ville_return', agence);
	}

function update_ville_return(str) {
	document.getElementById('show_ville').innerHTML = str;
	}

///////////////// PARTIE LOCATION ////////////////

/**************************/
function calendrier_disponibilite(annee, mois,products)
  	{
		document.getElementById('loader').style.display = "block";
		document.getElementById('loader').style.visibility = "visible";
		document.getElementById('calendrier_disponibilite').style.display = "none";
		document.getElementById('calendrier_disponibilite').style.visibility = "hidden";
		agent.call('','calendrier_disponibilite','update_calendrier_disponibilite',annee, mois, products);
	}

function calendrier_disponibilite_autre(products)
  	{
		document.getElementById('loader').style.display = "block";
		document.getElementById('loader').style.visibility = "visible";
		document.getElementById('calendrier_disponibilite').style.display = "none";
		document.getElementById('calendrier_disponibilite').style.visibility = "hidden";
		agent.call('','calendrier_disponibilite','update_calendrier_disponibilite', document.cal_product.liste_annee.value, document.cal_product.liste_mois.value, products);
	}

function update_calendrier_disponibilite(str)
	{
		document.getElementById('loader').style.display = "none";
		document.getElementById('loader').style.visibility = "hidden";
		document.getElementById('calendrier_disponibilite').style.display = "block";
		document.getElementById('calendrier_disponibilite').style.visibility = "visible";
		document.getElementById('calendrier_disponibilite').innerHTML = str;
	}

function modif_date(jour,mois,annee)
{

		if(debutfin==0)
		{
			document.period_search.date_debut.value=jour+"/"+mois+"/"+annee;

			if(jour<10)
			document.period_search.date_debut.value="0"+jour+"/"+mois+"/"+annee;

			if(mois<10)
			document.period_search.date_debut.value=jour+"/0"+mois+"/"+annee;

			if((jour<10)&&(mois<10))
			document.period_search.date_debut.value="0"+jour+"/0"+mois+"/"+annee;

			debutfin=1;

		}else{

			document.period_search.date_fin.value=jour+"/"+mois+"/"+annee;

			if(jour<10)
			document.period_search.date_fin.value="0"+jour+"/"+mois+"/"+annee;

			if(mois<10)
			document.period_search.date_fin.value=jour+"/0"+mois+"/"+annee;

			if((jour<10)&&(mois<10))
			document.period_search.date_fin.value="0"+jour+"/0"+mois+"/"+annee;

			debutfin=0;
		}


		efface_tarif_location();
}

function efface_tarif_location()
{
		affiche_bouton_reservation_return("");
		if((!isDate(document.period_search.date_debut.value))||(!isDate(document.period_search.date_fin.value)))
			alert("Veuillez saisir une date correcte!");


		document.getElementById('liste_des_forfaits').innerHTML = "";

}

function isDate(d) {
 // Cette fonction permet de vérifier la validité d'une date au format jj/mm/aa ou jj/mm/aaaa
 // Par Romuald

 if (d == "") // si la variable est vide on retourne faux
 return false;

 e = new RegExp("^[0-9]{1,2}\/[0-9]{1,2}\/([0-9]{2}|[0-9]{4})$");

 if (!e.test(d)) // On teste l'expression régulière pour valider la forme de la date
 return false; // Si pas bon, retourne faux

 // On sépare la date en 3 variables pour vérification, parseInt() converti du texte en entier
 j = parseInt(d.split("/")[0], 10); // jour
 m = parseInt(d.split("/")[1], 10); // mois
 a = parseInt(d.split("/")[2], 10); // année

 // Si l'année n'est composée que de 2 chiffres on complète automatiquement
 if (a < 1000) {
 if (a < 89) a+=2000; // Si a < 89 alors on ajoute 2000 sinon on ajoute 1900
 else a+=1900;
 }

 // Définition du dernier jour de février
 // Année bissextile si annnée divisible par 4 et que ce n'est pas un siècle, ou bien si divisible par 400
 if (a%4 == 0 && a%100 !=0 || a%400 == 0) fev = 29;
 else fev = 28;

 // Nombre de jours pour chaque mois
 nbJours = new Array(31,fev,31,30,31,30,31,31,30,31,30,31);

 // Enfin, retourne vrai si le jour est bien entre 1 et le bon nombre de jours, idem pour les mois, sinon retourn faux
 return ( m >= 1 && m <=12 && j >= 1 && j <= nbJours[m-1] );
 }

/************LISTE DES TARIFS**************/
function affiche_liste_tarifs(products)
	{
		agent.call('','affiche_liste_tarifs','affiche_liste_tarifs_return', document.period_search.date_debut.value, document.period_search.date_fin.value,document.period_search.heure_debut.value, document.period_search.heure_fin.value, products);

	}

function affiche_liste_tarifs_return(str1)
	{
		var pos = str1.indexOf('a', 0);
		var str = str1.substr(pos,str1.length-pos);

		var res = str.substr(1,12);
		res = parseInt(res);

		document.getElementById('liste_des_forfaits').innerHTML = str.substr(12,str.length-12);

		if(res == 1)
		affiche_bouton_reservation()

	}



/************* BOUTON RESERVATION *************/
function affiche_bouton_reservation()
	{
	agent.call('','affiche_bouton_reservation','affiche_bouton_reservation_return');
	}

function affiche_bouton_reservation_return(str)
	{
	document.getElementById('bouton_reservation').innerHTML = str;
	}

///////////////// PARTIE LISTE DES COURSES ////////////////

function affiche_liste_produits(categories)
	{
	agent.call('','affiche_liste_produits','affiche_liste_produits_return',categories);
	agent.call('','affiche_nom_rayon','affiche_nom_rayon_return',categories);
	}

function affiche_nom_rayon_return(str)
	{
	document.getElementById('nom_rayon').innerHTML = str;
	}

function affiche_liste_produits_return(str)
	{
	document.getElementById('liste_produits').innerHTML = str;
	}


function affiche_liste_courses()
	{
	agent.call('','affiche_liste_courses','affiche_liste_courses_return',document.le_formulaire.e_mail.value);
	}

function affiche_liste_courses_return(str)
	{
	document.getElementById('liste_courses').innerHTML = str;
	}

function ajouter_courses(products)
	{
		if(document.le_formulaire.e_mail.value=="")
		{alert("Veuillez saisir votre e-mail!");

		}else{
			agent.call('','ajouter_courses','ajouter_courses_return',document.le_formulaire.e_mail.value,products);
		}
	}

function ajouter_courses_return(str)
	{
	document.getElementById('liste_courses').innerHTML = str;
	}

function supprimer_courses(products)
	{
		if(document.le_formulaire.e_mail.value=="")
		{alert("Veuillez saisir votre e-mail!");

		}else{
			agent.call('','supprimer_courses','supprimer_courses_return',document.le_formulaire.e_mail.value,products);
		}
	}

function supprimer_courses_return(str)
	{
	document.getElementById('liste_courses').innerHTML = str;
	}


//----------------------------------------------------------------------------------

  var requests_running = 0;
  function products_listing_update() {
   var intY = parseInt(document.getElementById("products_listing").scrollTop);
   var hauteur = parseInt(document.getElementById("products_listing").scrollHeight );
   if ( (intY > (hauteur * 0.10)) && (requests_running == 0) )
   		{
   		requests_running = 1;
   		document.products_lock.pageactuelle.value = parseInt(document.products_lock.pageactuelle.value) + 1;
   		if (parseInt(document.products_lock.pageactuelle.value) <= parseInt(document.products_lock.pagemax.value))
   			{
   			agent.call('','products_listing_update','products_listing_receive', document.products_lock.pageactuelle.value);
   			}
		}
  }

//----------------------------------------------------------------------------------
  function products_listing_receive(str) {
 	var str2 = document.getElementById('products_listing').innerHTML;
    document.getElementById('products_listing').innerHTML = str2.substr(0, str2.length-8) + str;
    requests_running = 0;
   	}


//----------------------------------------------------------------------------------

  function test(type) {
   		if (type == "liste")
   			agent.call('','products_listing','test_return');
   		else if (type = "map")
   			agent.call('','map_listing','test_return');
  }
function test_return(str)
	{
	alert(str);
	document.getElementById('map_listing').innerHTML = str;
	}





//////////////// PARTIE CATEGORIE OFFICE ///////////////////////

  function update_models_advanced_search(cpath, form)
  	  {
//	  alert(cpath);
      agent.call('','get_models_auto_array','update_models_return_advanced_search', cpath, true, form);
	  }

  function update_models_return_advanced_search(str)
	  {
//	  alert('retour');
	  document.getElementById('show_model_advanced_search').innerHTML = str;
	  }

  function update_models_quick_find(cpath, form, afficher_version,level)
  	  {
      agent.call('','get_models_auto_array','update_models_return_quick_find', cpath, true, form, afficher_version,level);
	  }

  function update_models_return_quick_find(str)
	  {
		document.getElementById('show_model_quick_find').innerHTML = str;
	  }

  function show_count(cpath, C_1004)
  	  {
      agent.call('','show_count','show_count_return', cpath, C_1004);
	  }

  function show_count_return(str)
	  {
		document.getElementById('show_count_quick_find').innerHTML = str;
	  }

  function update_models_goto(cpath, form)
  	  {
      agent.call('','get_models_auto_array','update_models_return_goto', cpath, 'false', form);
	  }

  function update_models_return_goto(str)
	  {
		document.getElementById('show_model_goto').innerHTML = str;
	  }


///////////////// PARTIE MOTEUR DE RECHERCHE CUSTOMERS OFFICE ////////////////


  function update_models_search_form(cpath,form)
  	  {
      agent.call('','get_models_auto_array','update_models_return_search_form', cpath,form);
	  }

  function update_models_return_search_form(str)
	  {
		document.getElementById('show_model_search_form').innerHTML = str;
	  }

  function update_info(value)
  	  {
  	  if (value != "undefined")
	  value = document.manufacturers_info.coordonnees.value;

	  document.getElementById('photo_agence').innerHTML = '<img src="../office/maisonrouge/catalog/images/agence_' + value + '.jpg" width="210" height="175">';
      agent.call('','select_manufacturer_info','update_info_return', value);
	  }
  function update_info_return(str)
	  {
		document.getElementById('manufacturers_info').innerHTML = str;
	  }

  function loginzone(products_id)
  	  {
      agent.call('','loginzone','loginzone_return', products_id);
	  }

  function loginzone_return(str)
	  {
	  	if (document.getElementById('login_zone'))
			document.getElementById('login_zone').innerHTML = str;
	  }

function lostFocus()
	{
	if(document.getElementById('display_country').style.display == "block")
		{
		if(document.getElementById('select_country').selectedIndex>-1)
			{
			document.getElementById('C_65').value = document.getElementById('select_country').options[document.getElementById('select_country').selectedIndex].value;
			}
		}
	}

function lostFocus_form(form , divReturn)
	{
	if(document.getElementById(divReturn).style.display == "block")
		{
		if(document.getElementById(divReturn).selectedIndex>-1)
			{
			document.forms[form].C_65.value = document.getElementById('select_country').options[document.getElementById('select_country').selectedIndex].value;
			}
		}
	}

function suggereListeVille_form(valeur, form, divReturn, id, depts,force_first_ville,only_depts,dropdown)
{
	if(!depts)
		var depts = '';
	if(!dropdown)
		var dropdown = 'false';
	if(force_first_ville == null)
		var force_first_ville = '' ;
	if(only_depts == null)
		var only_depts = 'false' ;
	if(valeur.length>=3)
	{
		agent.call('','suggest_country_ajax_form','suggest_country_ajax_form_return',valeur, form, divReturn, id, depts,force_first_ville,only_depts,dropdown);
	}
}

function suggereListeVille(valeur)
	{
	if(valeur.length>=3)
		{
		agent.call('','suggest_country_ajax','suggest_country_ajax_return',valeur);
		}
	}

function suggereListeVille2(valeur)
	{
	if(valeur.length>=3)
		{
		agent.call('','suggest_country_ajax2','suggest_country_ajax_return',valeur);
		}
	}

function suggereListeVille3(valeur)
	{
	if(valeur.length>=3)
		{
		agent.call('','suggest_country_ajax3','suggest_country_ajax_return',valeur);
		}
	}

function suggest_country_ajax_return(str)
	{
	document.getElementById('display_country').style.display = "block";
	document.getElementById('display_country').innerHTML = str;
	}

function suggest_country_ajax_form_return(str)
{
	if(str!='')
	{
		var tab = str.split('|');
		if(document.getElementById(tab[1]))
		{
			document.getElementById(tab[1]).style.display = "block";
			document.getElementById(tab[1]).innerHTML = tab[2];
		}
		else
		{
			jQuery(tab[1]).html(tab[2]) ;
		}
		if(tab[3] !='')
			document.getElementById(tab[3]).value = tab[4];
	}
}

function affectValue(selectValue)
	{
	document.getElementById('display_country').style.display = "none";
	document.getElementById('C_65').value=selectValue;
	}


function affectValue_form(selectValue, form, divReturn, id)
	{
		document.getElementById(divReturn).style.display = "none";
		document.forms[form].elements[id].value=selectValue;
	}


  function products_info_fnaim_bzh(products_id)
  	  {
     agent.call('','products_info_fnaim_bzh','products_info_fnaim_bzh_return', products_id);
	  }

  function products_info_fnaim_bzh_return(str)
	  {
		var id = str.substr(0,12);
		id = parseInt(id);
		if(id) {
			document.getElementById('annonce_detail_' + id).innerHTML = str.substr(12,str.length-12);
			div_head_detail = document.getElementById('detail_head_'+id);
			div_annonce_detail = document.getElementById('annonce_detail_'+id);
			div_total_annonce = document.getElementById('total_annonce_'+id);
			table_annonce = document.getElementById('table_annonce_'+id);
			//div_detail = document.getElementById(id);
			display(div_head_detail);
			display(div_annonce_detail);
			nodisplay(id);
			//display(div_total_annonce);
			table_annonce.style.border=0;
			table_annonce.style.width="570px";
			//table_annonce.style.borderBottom="#aaa 2px dotted";
			div_total_annonce.style.border="#abd601 2px solid";
			div_total_annonce.style.backgroundColor="#f7fbd7";
			var nbx;
			nbx = document.getElementById('x'+id);
			var name = nbx.src;
			var end_name = name.substring(name.length-8 , name.length);

			if (name.substring(name.length-8 , name.length) == 'plus.gif') {
				nbx.src='../office/fnaim-bretagne/catalog/images/savoir_moins.gif';
			} else {
				nbx.src='../office/fnaim-bretagne/catalog/images/savoir_plus.gif';
			}
	tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
		}
	  }


		function log_clic(pid, type, div_return, manufacturers_id,admin_id)
		{
			if(manufacturers_id == ''|| manufacturers_id == undefined )
				manufacturers_id= '' ;
			if(admin_id == ''|| admin_id == undefined )
				admin_id= '' ;
			agent.call('','log_clic','log_clic_return',pid,type,div_return, manufacturers_id,admin_id);
		}
		function log_clic_close (div_return)
		{
			document.getElementById(div_return+'_return').style.display = "none";
			document.getElementById(div_return).style.display = "block";
		}

		function log_clic_return(str)
		{
			console.log(str);
			document.getElementById(str+'_return').style.display = "block";
			document.getElementById(str).style.display = "none";
		}

		function log_clic_surtaxe(pid, type, div_return, phone)
		{
			agent.call('','log_clic_surtaxe','log_clic_surtaxe_return',pid,type,div_return, phone);

		}

		function log_clic_surtaxe_return(str)
		{

			var tab = str.split('||') ;
			var div_return = tab[0];
			var phone = tab[1];
			if(phone!='')
			{
				agent.call('','get_num_surtaxe','get_num_surtaxe_return',phone, div_return+'_return');
			}
			document.getElementById(div_return+'_return').style.display = "block";
			document.getElementById(div_return).style.display = "none";
		}

function get_num_surtaxe_return(str)
{
	var tab = str.split('¤') ;
	var new_str = tab[0];
	var code = tab[1];
	var index = tab[2];
	str_code="";
	if( code !="")
	{
		str_code = ' - code :'+ code ;
	}
	document.getElementById(index).innerHTML=new_str + str_code;
}


	function add_to_selection(val)
	{
		agent.call('','add_to_selection','add_to_selection_return', val);
	}


	function add_to_selection_return(str)
	{
		var tab = str.split('|');

		if(document.getElementById('nb_selection'))
			document.getElementById('nb_selection').innerHTML = parseInt(document.getElementById('nb_selection').innerHTML) + 1 ;
		if(	tab[3] == 'true')
			document.getElementById('conteneur_buy_now_'+ tab[0] ).innerHTML = '<a class="btn_buy_now checked tooltip_btn"  data-toggle="tooltip" data-placement="top" title="Voir votre selection" href="#" onclick="remove_to_selection('+ tab[0] +');return false;">'+ tab[1] +'</a>';
		else
			document.getElementById('conteneur_buy_now_'+ tab[0] ).innerHTML = '<a class="btn_buy_now checked tooltip_btn"  data-toggle="tooltip" data-placement="top" title="Voir votre selection" href="shopping_cart.php?search_id= '+tab[2]+'">'+ tab[1] +'</a>';

		if (typeof jQuery != 'undefined')
		{
			if (jQuery("[rel=tooltip]").length)
				jQuery('.tooltip_btn').tooltip() ;
		}
		agent.call('','lock_products','lock_products_return', tab[0]);
	}

	function remove_to_selection(val)
	{
		agent.call('','remove_to_selection','remove_to_selection_return', val);
	}


	function remove_to_selection_return(str)
	{
		var tab = str.split('|');
		if(document.getElementById('nb_selection'))
			document.getElementById('nb_selection').innerHTML = parseInt(document.getElementById('nb_selection').innerHTML) - 1 ;
		document.getElementById('conteneur_buy_now_'+ tab[0] ).innerHTML = '<a class="btn_buy_now checked tooltip_btn"  data-toggle="tooltip" data-placement="top" title="Mémoriser" href="#" onclick="javascript:add_to_selection('+tab[0]+');return false;">'+ tab[1] +'</a>';
		if (typeof jQuery != 'undefined')
		{
			if (jQuery("[rel=tooltip]").length)
				jQuery('.tooltip_btn').tooltip() ;
		}
		agent.call('','unlock_products','unlock_products_return', tab[0]);
	}

	function add_to_exclude_selection(val)
	{
		var result = confirm("Voulez-vous vraiment exclure ce bien de votre recherche ?");
		if (result == true)
			agent.call('','add_to_exclude_selection','add_to_exclude_selection_return', val);
	}

	function add_to_exclude_selection_return(val)
	{
		$("#result_carto_listing .bien").each(function() {
            if($(this).data("product-id") == val){
            	$(this).fadeToggle(400);
            }
        });
	}

  function add_to_compare (pid, checkbox_mode,val, reload )
  {
		if(checkbox_mode == 'true')
		{
				var add = 'false';
		if(val.checked)
			add = 'true';
		else
			add = 'false';

			agent.call ('' , 'add_to_compare' , 'add_to_compare_return_checkbox_mode' , pid, add, reload);
		}
		else
		{
			agent.call ('' , 'add_to_compare' , 'add_to_compare_return' , pid);
		}
  }


	function count_to_compare()
	{
		agent.call('','count_to_compare','count_to_compare_return');
	}
	function count_to_compare_return(str)
	{
		window.content.nb_in_compare = str;
	}

	function add_to_compare_return (tab)
	{
		//var tab = str.split('|');
		if(document.getElementById('nb_compare'))
		{
			document.getElementById('nb_compare').innerHTML = parseInt(document.getElementById('nb_compare').innerHTML) + 1 ;
		}
		var div =  document.getElementById('conteneur_compare_'+ tab[0] ) ;

		div.innerHTML = '<a href="products_comparateur.php" class="btn_compare checked tooltip_btn"  data-toggle="tooltip" data-placement="top" title="Accéder au comparateur">'+ tab[1] +'</a>';
		if (typeof jQuery != 'undefined')
		{
			if (jQuery("[rel=tooltip]").length)
				jQuery('.tooltip_btn').tooltip() ;
		}
	}
	function add_to_compare_return_checkbox_mode (tab)
	{
		if(tab[3] == 'true')
		{
			setTimeout("location.reload()",500);
		}

	}


		function active_alert( id , mode, val)
		{
			agent.call('', 'active_alert', 'active_alert_return' , id, mode, val);
		}
		function active_alert_return(str)
		{
			if(str[2]=='1')
			{
				document.getElementById(str[1]+'_ok_'+str[0]).className = 'alerts_ok';
				document.getElementById(str[1]+'_ko_'+str[0]).className = 'alerts_ko';
			}
			else
			{
				document.getElementById(str[1]+'_ok_'+str[0]).className = 'alerts_ko';
				document.getElementById(str[1]+'_ko_'+str[0]).className = 'alerts_ok';
			}
		}


		/** shopping_cart */
		function delete_from_cart(pid)
		{
			agent.call('','delete_from_cart','delete_from_cart_return',pid);
		}
		function delete_from_cart_return()
		{
			setTimeout("location.reload()",500);
		}



	function charge_depts(region_id, dept_id){
		agent.call('','charge_depts','depts_return',region_id,dept_id);
	}

	function depts_return(str)
	{
		document.getElementById('depts').innerHTML = str;
	}

	function charge_villes(dept_id){

		agent.call('','charge_villes','villes_return',dept_id);
	}

	function villes_return(str){
		document.getElementById('villes').innerHTML = str;
	}

	function charge_villes_extend(dept_id, div_return,form_name, def_value, chef_lieu){

		agent.call('','charge_villes_extend', 'charge_villes_extend_return', dept_id, div_return, form_name, def_value, chef_lieu);
	}

	function charge_villes_extend_return(str){

		tab = str.split('|');
		document.getElementById('' + tab[0] + '' ).innerHTML = tab[1];
	}


	/* vote sur les biens */
	function rate_this_product (pid, cust , val, rev, sty)
	{
		agent.call ('','rate_this_product','rate_this_product_return',pid,cust,val,rev,sty);
	}
	function rate_this_product_return(str)
	{
		tab = str.split('|');
		document.getElementById('rating_'+tab[0]).innerHTML = tab[1];
	}

	function comment_this_product (pid, cust , val, rev)
	{
		var c_status = $("input[name='comments_status_"+pid+"_"+cust+"']:checked").val();
		agent.call ('','comment_this_product','comment_this_product_return',pid,cust,val,rev,c_status);
	}
	function comment_this_product_return(str)
	{
		tab = str.split('|');
		document.getElementById('comment_'+tab[0]).innerHTML = tab[1];
		show_edit_comments('list_comment_'+tab[0]);
	}

	/* Facebook */
	function send_create_facebook_account(result)
	{
		agent.call('','create_facebook_account','create_facebook_account_return',result);
	}
	function create_facebook_account_return(str)
	{
		if(parseInt(str) == 0){
			window.location = "http://immo-dev.ac3-distribution.com/immo/catalog/account_edit.php";
		}
		return true;
	}

	function get_products_search_ajax_return(str)
	{
		var cpt = 0 ;
		var bien = '' ;
		var biens_arr = new Array;

		if(typeof(str)=="object")
		{
			map.remove_markers() ;
			if(str.length > 0 )
			{
				if(str[0]['products_id'] != null)
				{
					markers = new Array ;
					for(var i = 0; i < str.length; i++)
					{
						if(str[i]['1935'] != '' && str[i]['1935'] != null && str[i]['1935'] != ',')
						{
							array_latlng =  str[i]['1935'].split(',') ;
							var photo = '' ;
							if(str[i]['products_images'].length > 0)
							{
								photo = str[i]['products_images'][0] ;
							}
							if(array_latlng[0] == '46.2276380' && array_latlng[1] == '2.2137490')
							{

							}
							else
							{
								map.add_product_marker(array_latlng[0],array_latlng[1],str[i]['filename_url'], str[i]['products_name'],photo,str[i]) ;
								cpt++ ;
							}
							if(document.getElementById('home_selection') && str[i]['124'] == 'Exclusif')
							{
								if(str[i]['products_images'].length > 0)
									bien = '<li><div class="info_bien"><a href="'+str[i]['filename_url']+'" class="lien"><h3>'+str[i]['products_name']+'</h3></a></div><a href="'+str[i]['filename_url']+'" class="img"><img src="'+str[i]['products_images'][0]+'" width="200" height="150"></a><p>'+str[i]['1934'] +'<br />'+ str[i]['light_products_price'] +'<br /><br /><div class="bt"><a href="'+str[i]['filename_url']+'">en savoir +</a></div></p></li>';
								biens_arr.push(bien) ;
							}
						}
						else
						{
							//alert('pas de géoloc pour ce bien' + str[i]['products_id']) ;
						}
					}
					if(document.getElementById('home_selection'))
					{
						if(biens_arr.length > 0)
						{
							jQuery('#mycarousel').remove();
							var new_html = '<h2>' + biens_arr.length + ' bien(s) exclusif(s) dans le résultat de votre recherche...' + '</h2><div id="wrap"><ul id="mycarousel" class="jcarousel-skin-ie7">';

							for(var i in biens_arr)
							{
								new_html += biens_arr[i] ;
							}
							new_html+= '</ul></div>' ;
							document.getElementById('home_selection').innerHTML= new_html;
							jQuery('#mycarousel').jcarousel({
								auto: 5,
								initCallback: mycarousel_initCallback
							});
						}
						else
						{
							if(document.getElementById('home_selection'))
								document.getElementById('home_selection').innerHTML= '<h2>Aucun bien exclusif dans le résultat ...' + '</h2><div id="wrap"><ul id="mycarousel" class="jcarousel-skin-ie7"></ul></div>';
						}
					}
					map.recadre();
				}
			}
			else
			{
				document.getElementById('home_selection').innerHTML= '<h2>Aucun bien exclusif ...' + '</h2><div id="wrap"><ul id="mycarousel" class="jcarousel-skin-ie7"></ul></div>';
			}
		}
		else
		{

			if(str.indexOf('<script>') > 0 )
			{
				res = str.split('<script>') ;
				jQuery("body").append('<script>'+res[1]);
			}
			if(document.getElementById('title_search'))
				document.getElementById('title_search').innerHTML = '' ;
			if(document.getElementById('espace_title_search'))
				document.getElementById('espace_title_search').innerHTML = '' ;
			if(document.getElementById('result_ajax'))
				document.getElementById('result_ajax').innerHTML = '' ;
			if(document.getElementById('conteneur_main'))
				document.getElementById('conteneur_main').innerHTML = str ;
			if(document.getElementById('res_listing_bien'))
				document.getElementById('res_listing_bien').innerHTML = str ;
			if(document.getElementById('ajax_mode_listing') && document.getElementById('ajax_mode_listing').value == 'infinite_scroll')
			{
				if(document.getElementById('res_advanced_search_result'))
					document.getElementById('res_advanced_search_result').innerHTML += str ;
			}
			else
			{
				if(document.getElementById('res_advanced_search_result'))
					document.getElementById('res_advanced_search_result').innerHTML = str ;
			}
			// ajout des markers google map
		}

		if(document.getElementById('show_nb_bien'))
		{
			document.getElementById('nb_search_bien').style.display ='block' ;
			document.getElementById('show_nb_bien').innerHTML = cpt ;
		}
		if(document.getElementById('mask_transp'))
			document.getElementById('mask_transp').style.display ='none' ;
		if(document.getElementById('mask_loading'))
			document.getElementById('mask_loading').style.display ='none' ;

	}

	function get_manufacturers_search_ajax_return(str)
	{
		var cpt = 0 ;
		var bien = '' ;
		var biens_arr = new Array;
		if(typeof(str)=="object")
		{
			map.remove_markers() ;
			if(str.length > 0 )
			{
				if(str[0]['manufacturers_id'] != null)
				{
					markers = new Array ;
					for(var i = 0; i < str.length; i++)
					{
						//alert(str[i]['latitude']);
						if(str[i]['latitude'] != undefined && str[i]['longitude'] != undefined && str[i]['latitude'] != '' && str[i]['longitude'] != '' )
						{
							var photo = '' ;
							if(str[i]['manufacturers_image']!= '')
							{
								photo = str[i]['manufacturers_image'] ;
							}
							if(str[i]['latitude'] == '46.2276380' && str[i]['longitude'] == '2.2137490')
							{

							}
							else
							{
								popup_content = '<div class="leaflet_man_name"><a href="'+ str[i]['filename_url'] +'" >' + str[i]['manufacturers_name'] +'</a></div>';
								popup_content += '<div class="leaflet_man_address">'+ str[i]['address'] +'</a><br/>'+ str[i]['postal_code'] +' '+ str[i]['city'] +'</div>';
								if(str[i]['telephone'] != undefined)
									popup_content += '	<div class="leaflet_man_tel">Tél. : ' + str[i]['telephone'] + '</div>' ;
								map.add_product_marker(str[i]['latitude'], str[i]['longitude'], str[i]['filename_url'], popup_content, photo,'','','','','',false) ;
								cpt++ ;
							}
						}
						else
						{
							//alert('pas de géoloc pour ce bien' + str[i]['products_id']) ;
						}
					}
					map.recadre();
				}
			}
		}
		else
		{
			if(document.getElementById('list_manufacturers_content'))
				document.getElementById('list_manufacturers_content').innerHTML = str ;
		}
	}


	function IsJsonString(str)
	{
		try
		{
			if (JSON.parse(str) == false) return false;
		} catch (e) {
			return false;
		}
		return true;
	}

	function get_secteurs_city_selection_return(str)
	{
		if(typeof(str)=="object")
		{

		}
		else
		{
			document.getElementById('secteurs_content').innerHTML = str ;
		}
	}

	function get_geoloc_ville_return(str)
	{
		if(typeof(str)=="object")
		{
			map.recadre(str['latitude'], str['longitude']) ;
		}
	}

	function printUrlToPDF(url)
	{
		agent.call('','print_PDF','printUrlToPDF_return', url);
	}

	function printUrlToPDF_return(str)
	{
		if(str!='')
		{
			window.open(str,'_blank');
		}
	}

	function addslashes(ch) {
		ch = ch.replace(/\\/g,"\\\\")
		ch = ch.replace(/\'/g,"\\'")
		ch = ch.replace(/\"/g,"\\\"")
		return ch ;
	}
	function setNewCookie(sName, sValue)
	{
		var today = new Date(), expires = new Date();
		expires.setTime(today.getTime() + (30*24*60*60*1000));
		document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString() +";path=/";
	}

	function open_modal_iframe(src, title, no_title, id, addClass, callback) {
		open_modal_iframe_global(src, title, no_title, id, addClass, callback);
	}

	function open_modal_iframe_global(src, title, no_title, id, addClass, callback)
	{
		if(id==''|| id == undefined )
			id= '#modal_popup_iframe' ;

		jQuery(id + ' iframe' ).attr('src',src) ;

        // On supprime la class pour remettre à zero les classes s'il y a eu ajout lors d'une autre ouverture open_modal_iframe_global()
        jQuery(id).find('.modal-dialog').removeAttr('class').attr('class', 'modal-dialog modal-lg');
        if(addClass && addClass != '')
            jQuery(id).find('.modal-dialog').addClass(addClass);

		if(no_title == 'true')
		{

		}
		else
		{
			if(title!='')
			{
				jQuery(id +' h4').html(title) ;

			}
			else
			{
				jQuery(id +' h4').html(jQuery('iframe h1').html()) ;
			}
		}
		jQuery(id).modal();

        if (callback && typeof(callback) === "function") {
            callback(id);
        }
	}
