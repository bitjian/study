Set<Integer> set=Client_Info.keySet();
        List<Integer> list1=new ArrayList<Integer>(set);
        for(int i=0;i<list1.size();i++){
            System.out.println(list1.get(i));
        }
        System.out.println(list1);


        for (int i=0;i<list.size();i++){
            Map map1=new HashMap();
            map1.put("TCName",list.get(i).getDeviceTCName());
            int type=0;
            for(int w=0;w<list1.size();w++){
                if(list.get(i).getDeviceNum()==list1.get(w)){
                    type=i;
                    break;
                }else{
                    type=0;
                }
            }
            if(type!=0){
                client_message=Client_Info.get(list.get(type).getDeviceNum());
//            System.out.println(list.get(i).getDeviceNum());

//            map1.put("TCName",list.get(i).getDeviceTCName());
//            System.out.println(client_message);
                if (client_message != null) {

                    if(client_message.ONProcess==true){
                        map1.put("leftType","切换过程中");
                        int rightID=Client_GP.Device_Pairing.get(list.get(type).getDeviceNum());
                        if(Client_Info.get(rightID)==null){
                            if(i%2==0){
                                map1.put("groupType",false);
                                map1.put("leftType",true);
                                map1.put("rightType","离线");
                            }else{
                                map1.put("groupType",false);
                                map1.put("leftType","离线");
                                map1.put("rightType",true);
                            }
                        }else{
                            if(Client_Info.get(rightID).ONProcess==true){
                                map1.put("rightType","切换过程中");
                                map1.put("groupType",false);
                            }else{
                                if(Client_Info.get(rightID).OnlineState==true){
                                    map1.put("rightType",true);
                                    map1.put("groupType",true);
                                }else if(Client_Info.get(rightID).OnlineState=false&&Client_Info.get(rightID).ONMQTT==true){
                                    map1.put("rightType",false);
                                    map1.put("groupType",false);
                                }else if(Client_Info.get(rightID).OnlineState==false&&Client_Info.get(rightID).ONMQTT==false){
                                    map1.put("rightType","离线");
                                    map1.put("groupType",false);
                                }
                            }
                        }
                    }else{
                        if(client_message.OnlineState==true){
                            System.out.println("aaaaaaaaaaaaaaaaaa");
                            map1.put("leftType",true);
                            int rightID=Client_GP.Device_Pairing.get(list.get(type).getDeviceNum());
                            System.out.println(Client_Info.get(rightID));
                            if(Client_Info.get(rightID)==null){
                                if(i%2==0){
                                    map1.put("groupType",false);
                                    map1.put("leftType",true);
                                    map1.put("rightType","离线");
                                }else{
                                    map1.put("groupType",false);
                                    map1.put("leftType","离线");
                                    map1.put("rightType",true);
                                }
                            }else{
                                if(Client_Info.get(rightID).ONProcess==true){
                                    map1.put("rightType","切换过程中");
                                    map1.put("groupType",false);
                                }else{
                                    if(Client_Info.get(rightID).OnlineState==true){
                                        map1.put("rightType",true);
                                        map1.put("groupType",true);
                                    }else if(Client_Info.get(rightID).OnlineState=false&&Client_Info.get(rightID).ONMQTT==true){
                                        map1.put("rightType",false);
                                        map1.put("groupType",false);
                                    }else if(Client_Info.get(rightID).OnlineState==false&&Client_Info.get(rightID).ONMQTT==false){
                                        map1.put("rightType","离线");
                                        map1.put("groupType",false);
                                    }
                                }
                            }

                        }else if(client_message.OnlineState==false&&client_message.ONMQTT==true){
                            map1.put("leftType",false);
                            int rightID=Client_GP.Device_Pairing.get(list.get(type).getDeviceNum());
                            if(Client_Info.get(rightID)==null){
                                if(i%2==0){
                                    map1.put("groupType",false);
                                    map1.put("leftType",true);
                                    map1.put("rightType","离线");
                                }else{
                                    map1.put("groupType",false);
                                    map1.put("leftType","离线");
                                    map1.put("rightType",true);
                                }
                            }else{
                                if(Client_Info.get(rightID).ONProcess==true){
                                    map1.put("rightType","切换过程中");
                                    map1.put("groupType",false);
                                }else{
                                    if(Client_Info.get(rightID).OnlineState==true){
                                        map1.put("rightType",true);
                                        map1.put("groupType",false);
                                    }else if(Client_Info.get(rightID).OnlineState==false&Client_Info.get(rightID).ONMQTT==true){
                                        map1.put("rightType",false);
                                        map1.put("groupType",false);
                                    }else if(Client_Info.get(rightID).OnlineState==false&&Client_Info.get(rightID).ONMQTT==false){
                                        map1.put("rightType","离线");
                                        map1.put("groupType",false);
                                    }
                                }
                            }

                        }else if(client_message.OnlineState==false&&client_message.ONMQTT==false){
                            map1.put("leftType","离线");
                            int rightID=Client_GP.Device_Pairing.get(list.get(type).getDeviceNum());
                            if(Client_Info.get(rightID)==null){
                                if(i%2==0){
                                    map1.put("groupType",false);
                                    map1.put("leftType",true);
                                    map1.put("rightType","离线");
                                }else{
                                    map1.put("groupType",false);
                                    map1.put("leftType","离线");
                                    map1.put("rightType",true);
                                }
                            }else{
                                if(Client_Info.get(rightID).ONProcess==true){
                                    map1.put("rightType","切换过程中");
                                    map1.put("groupType",false);
                                }else{
                                    if(Client_Info.get(rightID).OnlineState==true){
                                        map1.put("rightType",true);
                                        map1.put("groupType",false);
                                    }else  if(Client_Info.get(rightID).OnlineState==false&&Client_Info.get(rightID).ONMQTT==true){
                                        map1.put("rightType",false);
                                        map1.put("groupType",false);
                                    }else if(Client_Info.get(rightID).OnlineState==false&&Client_Info.get(rightID).ONMQTT==false){
                                        map1.put("rightType","离线");
                                        map1.put("groupType",false);
                                    }
                                }
                            }

                        }
                    }
                }

                if(map1.size()!=0){
                    int TCName_number=0;
                    System.out.println(mapList.size());
                    for(int z=0;z<mapList.size();z++){
                        System.out.println(mapList.get(z));
                    }
                    System.out.println("bbbbbbbbbbbbbbbbb");
                    System.out.println(map1);
                    if(mapList.size()!=0){
                        for(int j=0;j<mapList.size();j++){
                            if(map1.get("TCName").equals(mapList.get(j).get("TCName"))){
                                mapList.remove(j);
                                break;
                            }else if(!map1.get("TCName").equals(mapList.get(j).get("TCName"))){
                                TCName_number=j;
                            }
                        }
                        System.out.println((TCName_number+1)+"-------------------   "+mapList.size());
                        if((TCName_number+1)==mapList.size()){
                            mapList.add(map1);
                        }else{
                            if(map1.size()==4){
                                mapList.add(map1);
                            }

                        }
                    }else{
                        mapList.add(map1);
                    }
                }
            }else if(type==0){
                map1.put("groupType",false);
                map1.put("leftType","离线");
                map1.put("rightType","离线");
                if(map1.size()!=0){
                    int TCName_number=0;
                    System.out.println(mapList.size());
                    for(int z=0;z<mapList.size();z++){
                        System.out.println(mapList.get(z));
                    }
                    System.out.println("ccccccccccccccccccccc");
                    System.out.println(map1);
                    if(mapList.size()!=0){
                        for(int j=0;j<mapList.size();j++){
                            if(map1.get("TCName").equals(mapList.get(j).get("TCName"))){
                                if(mapList.get(j).get("leftType")=="离线"&&mapList.get(j).get("rightType")=="离线"){
                                    mapList.remove(j);
                                    break;
                                }else{
                                    break;
                                }

                            }else if(!map1.get("TCName").equals(mapList.get(j).get("TCName"))){
                                TCName_number=j;
                            }
                        }
                        System.out.println((TCName_number+1)+"-------------------   "+mapList.size());
                        if((TCName_number+1)==mapList.size()){
                            mapList.add(map1);
                        }else if(TCName_number==mapList.size()){
                            mapList.add(map1);
                        }
//                        else{
//                            if(map1.size()==4){
//                                mapList.add(map1);
//                            }
//
//
//                        }
                    }else{
                        mapList.add(map1);
                        System.out.println("添加成功"+mapList.size());
                    }
                }
            }
        }
        System.out.println(mapList);
        return mapList;