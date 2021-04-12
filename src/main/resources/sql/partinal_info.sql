CREATE TABLE `partinal_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '用户名',
  `full_name` varchar(30) CHARACTER SET utf8 DEFAULT '' COMMENT '用户全名',
  `limit_code` varchar(30) CHARACTER SET utf8 DEFAULT '' COMMENT '限定符',
  `belong_group` varchar(30) CHARACTER SET utf8 DEFAULT '' COMMENT '所属组',
  `role` varchar(30) CHARACTER SET utf8 DEFAULT '' COMMENT '角色',
  `type` varchar(20) CHARACTER SET utf8 DEFAULT '' COMMENT '类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (1, 'san', 'zhangsan', 'html', '4', '审批者', '审批者1');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (2, 'si', 'lisi', 'html', '1', '审批者', '审批者2');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (3, 'wu', 'wangwu', 'java', '2', '终结者', '终结者1');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (4, 'liu', 'zhaoliu', 'react', '1', '终结者', '终结者2');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (5, 'yi', 'qianyi', 'html', '3', '吃瓜群众', '吃瓜群众1');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (6, 'er', 'shuner', 'vue', '1', '吃瓜群众', '吃瓜群众2');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (7, 'qi', 'zhouqi', 'html', '2', '吃瓜群众', '吃瓜群众3');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (8, 'ba', 'liba', 'vue', '3', '吃瓜群众', '吃瓜群众4');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (9, 'jiu', 'wujiu', 'html', '2', '吃瓜群众', '吃瓜群众5');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (10, 'shi', 'zhengshi', 'java', '3', '吃瓜群众', '吃瓜群众6');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (11, 'shiyi', '路易十一', 'html', '4', '吃瓜群众', '吃瓜群众7');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (12, 'shisan', '路易十三', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (13, 'shisi', '路易十四', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (14, 'shiwu', '路易十五', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (15, 'shiliu', '路易十六', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (16, 'shiqi', '路易十七', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (17, 'shiba', '路易十八', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (18, 'shijiu', '路易十九', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (19, 'ershi', '路易二十', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (20, 'ershiyi', '路易二十一', 'java', '1', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (21, 'ershier', '路易二十二', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (22, 'ershisan', '路易二十三', 'java', '1', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (23, 'ershisi', '路易二十四', 'java', '2', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (24, 'ershiwu', '路易二十五', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (25, 'ershiliu', '路易二十六', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (26, 'ershiqi', '路易二十七', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (27, 'ershiba', '路易二十八', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (28, 'ershijiu', '路易二十九', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (29, 'sanshi', '路易三十', 'java', '3', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (30, 'sanshiyi', '路易三十一', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (31, 'sanshier', '路易三十二', 'java', '2', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (32, 'sanshisan', '路易三十三', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (33, 'sanshisi', '路易三十四', 'java', '4', '吃瓜群众', '吃瓜群众8');
INSERT INTO `partinal_info`(`id`, `user_name`, `full_name`, `limit_code`, `belong_group`, `role`, `type`) VALUES (34, 'sanshiwu', '路易三十五', 'java', '4', '吃瓜群众', '吃瓜群众8');
