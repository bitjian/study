const str = "select\nup.id\nfrom\n(select\n  id, process_name,class_name,title,location,width,height\nfrom\n  ad_intercept.t_od_pcmgr_unknown_popup_report\nwhere\n   1=1  and ds = 20230506  and lower(process_name) = lower('appmarket.exe')  and type = '1'  and (white_status=-1 and rule_status=-1) \n) up,\nad_intercept.t_ad_win_whitelist adw \nwhere \nif(adw.processname is null, 1 = 1, up.process_name = adw.processname)\nand if(adw.classname is null, 1 = 1, up.class_name = adw.classname)\nand if(adw.title is null, 1 = 1, up.title = adw.title)\nand if(adw.showlocation is null, 1 = 1, up.location = adw.showlocation)\nand if(adw.winwidthzone is null, up.width = adw.winwidth, up.width BETWEEN adw.winwidth and adw.winwidthzone )\nand if(adw.winheightzone is null, up.height = adw.winheight, up.height BETWEEN adw.winheight and adw.winheightzone)"



const replaceStr = str.replace(/\n/g, '')
console.log(replaceStr)