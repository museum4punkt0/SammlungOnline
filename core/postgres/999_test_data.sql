INSERT INTO smb.user (email, password, editor_scope, role_id) VALUES 
 ('administrator', public.crypt('xailabs$123', public.gen_salt('bf', 10)), 'INTRO|TOPICS|GUIDE|SYSTEM', 2)
;
INSERT INTO smb.user (email, password, editor_scope, role_id) VALUES
 ('admin-intro',  '$2a$10$z/2wgBIpi.a0Uts.1r/J8umrEw069gBngeNv6o8d5HIGdEoJANN46', 'INTRO',  3)
,('admin-topics', '$2a$10$yMSzaYDaM72N9vjTPqwnG.KLe6IX4OrqdtlXOB..aDf8PmWApQ7Ru', 'TOPICS', 3)
,('admin-guide',  '$2a$10$m.Bk3XY9OnbyNBhQuq40L.ortnMoDo7/GpXjKn2cUS.3B3Dk5CePa', 'GUIDE',  3)
,('admin',        '$2a$10$wqCSQAaLO4UZFHqxP226.u435k/DakQeXhb3CsMTSukOn7FdTluPu', 'INTRO|TOPICS|GUIDE|SYSTEM', 3)
;


INSERT INTO smb.objects (id) VALUES
( 138245), ( 144854), ( 185580), ( 188405), ( 192996), ( 194398), ( 207024), ( 209119), ( 455905), ( 457472), ( 461069), ( 464652), 
( 506882), ( 525524), ( 605994), ( 606182), ( 606189), ( 606325), ( 606402), ( 606555), ( 606563), ( 606569), ( 606590), ( 606592), 
( 606600), ( 606603), ( 606612), ( 606868), ( 606948), ( 607025), ( 607026), ( 607035), ( 607132), ( 607473), ( 610602), ( 676679), 
( 679150), ( 681084), ( 681513), ( 681547), ( 686435), ( 686542), ( 686551), ( 686562), ( 690892), ( 694165), ( 694167), ( 694201), 
( 694435), ( 697074), ( 698150), ( 698486), ( 698497), ( 698508), ( 698517), ( 698594), ( 698904), ( 699156), ( 704266), ( 725656), 
( 738996), ( 751219), ( 757102), ( 757316), ( 757710), ( 778401), ( 782360), ( 793415), ( 811307), ( 813339), ( 828031), ( 829869), 
( 829881), ( 830177), ( 831751), ( 835029), ( 844514), ( 850479), ( 857407), ( 858116), ( 862322), ( 862383), ( 862455), ( 862679), 
( 862779), ( 862806), ( 862977), ( 863076), ( 863088), ( 863431), ( 863623), ( 863675), ( 863713), ( 863888), ( 863921), ( 863959), 
( 863982), ( 864025), ( 864094), ( 864346), ( 864632), ( 864730), ( 864792), ( 864905), ( 865152), ( 865204), ( 865261), ( 865413), 
( 865492), ( 865524), ( 865646), ( 865684), ( 865766), ( 865772), ( 865773), ( 866140), ( 866193), ( 866204), ( 866482), ( 866984), 
( 867142), ( 867231), ( 867248), ( 867250), ( 867342), ( 867374), ( 867376), ( 867398), ( 867401), ( 867432), ( 867610), ( 867614), 
( 867777), ( 867928), ( 867954), ( 868114), ( 868225), ( 868435), ( 868686), ( 868771), ( 868879), ( 868906), ( 869002), ( 869003), 
( 869059), ( 869139), ( 869165), ( 869166), ( 869230), ( 869311), ( 869327), ( 869413), ( 869519), ( 869623), ( 869634), ( 869667), 
( 869931), ( 870118), ( 870136), ( 870208), ( 870224), ( 870320), ( 870347), ( 870381), ( 870405), ( 870407), ( 870570), ( 870634), 
( 870818), ( 870983), ( 871029), ( 871048), ( 871190), ( 871193), ( 871267), ( 871363), ( 871481), ( 871562), ( 871677), ( 871762), 
( 871908), ( 871959), ( 874077), ( 874100), ( 874489), ( 884881), ( 889083), ( 894605), ( 900173), ( 906135), ( 908502), ( 913233), 
( 913646), ( 918288), ( 926755), ( 931917), ( 933267), ( 935703), ( 936040), ( 940981), ( 942109), ( 944072), ( 959918), ( 960693), 
( 960810), ( 960902), ( 961043), ( 962308), ( 962626), ( 962789), ( 962983), ( 963023), ( 963040), ( 965168), ( 965359), ( 965511), 
( 965706), ( 966196), ( 966477), ( 967064), ( 967648), ( 967799), ( 975165), ( 978587), ( 982074), ( 984202), ( 984286), ( 985592), 
( 989316), ( 994042), (1005864), (1006271), (1025129), (1040072), (1049766), (1063193), (1142947), (1252808), (1352339), (1363213), 
(1363733), (1368117), (1368124), (1368422), (1368651), (1408418), (1408520), (1408856), (1408916), (1409065), (1409070), (1409074), 
(1409180), (1409201), (1415193), (1415200), (1418423), (1418747), (1418852), (1420479), (1420802), (1420804), (1420902), (1435195), 
(1437085), (1437104), (1438602), (1439580), (1440107), (1441302), (1449296), (1490124), (1490208), (1504348), (1517692), (1521009), 
(1521078), (1521083), (1523505), (1523508), (1525323), (1525337), (1525405), (1525417), (1525418), (1525436), (1525437), (1525443), 
(1525479), (1525541), (1525546), (1525547), (1527349), (1528427), (1534206), (1534216), (1534221), (1534234), (1534274), (1537951), 
(1542797), (1565799), (1567610), (1574741), (1576298), (1579428), (1590140), (1614671), (1619311), (1621794), (1621948), (1621989), 
(1623786), (1626963), (1626974), (1627217), (1627324), (1628989), (1632045), (1632111), (1632119), (1632133), (1632609), (1632618), 
(1632642), (1632643), (1632726), (1632749), (1632867), (1636060), (1636064), (1636077), (1636087), (1637229), (1660643), (1660649), 
(1681760), (1681792), (1682104), (1695675), (1742966), (1742985), (1743727), (1743795), (1743992), (1744057), (1744059), (1744120), 
(1744123), (1744130), (1744134), (1744143), (1744146), (1744361), (1744371), (1744437), (1744641), (1747092), (1747145), (1747439), 
(1747440), (1747812), (1747817), (1747825), (1747832), (1751133), (1751135), (1751137), (1751143), (1751154), (1751749), (1751758), 
(1751989), (1752026), (1752036), (1752045), (1752052), (1752114), (1752124), (1752137), (1752149), (1795389), (1795934), (1795942), 
(1888239), (1964342), (2353196), (2353516), (2353674), (2353762), (2354996), (2355141), (2355531), (2355640), (2355827), (2356232), 
(2356751), (2356969), (2357632), (2357993), (2358797), (2359519), (2360214), (2361273), (2361873), (2363054), (2365169), (2370561), 
(2373351), (2374633), (2440904);


INSERT INTO smb.tours(id, "number", preview_image, museum, duration) VALUES 
 (1, 1, '3170732.jpg', 'Bode Museum',  60)
,(2, 2, '5598450.jpg', 'Bode Museum', 120)
,(3, 3, '2704809.jpg', 'Bode Museum', 120)
,(4, 4, '3251317.jpg', 'Bode Museum', 120)
,(5, 5, '3170732.jpg', 'Bode Museum', 120)
;


INSERT INTO smb.tours_translation(title, subtitle, abstract, description, tour_id, language_id) VALUES 
 ('In Liebe und Krieg', 'DER ZWEITE BLICK - Spielarten der Liebe.', 'Die erste Route spürt der Darstellung des heroischen Soldaten und den Grenzen zwischen männlicher Kühnheit und Bisexualität nach.', 'Das Ideal des Soldaten wird zumeist mit dem Bild des heterosexuellen Mannes assoziiert. Andere sexuelle Orientierungen scheinen darin keinen Platz zu finden. Dabei handelt es sich jedoch um ein Klischee der jüngeren Zeit, das im Hinblick auf Darstellungen der klassischen Heroen schnell zu falschen Schlüssen verleiten kann. In der Antike ging Heldentum Hand in Hand mit Bisexualität. Diese wurde in den Armeen durchaus positiv gesehen, weil sie die emotionalen Bindungen unter den Soldaten festigen und hierdurch Kampfgeist und Moral stärken sollte. Die wichtigsten militärischen Helden der griechischen und römischen Mythologie folgten dementsprechend dieser sexuellen Orientierung.', 1, 1)
,('Männliche Künstler und Homo­sexualität', 'DER ZWEITE BLICK - Spielarten der Liebe.', 'Die zweite Route befasst sich mit Werken, die von Künstlern geschaffen wurden, die homosexuell waren oder zumindest dieser Gruppe nahestanden.', 'Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis, das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung', 2, 1)
,('Antike Kunst und Aufgeklärtes Sammeln', 'DER ZWEITE BLICK - Spielarten der Liebe.', 'Die dritte Route beschäftigt sich mit männlichen Sammlern, die bekanntermaßen homosexuell waren.', 'Die gesellschaftlichen und kulturellen Errungenschaften der griechischen und römischen Antike wurden in späteren Zeiten oftmals als vorbildlich empfunden. Eine besondere Wertschätzung erfuhren sie im 18. Jahrhundert, als die archäologischen Ausgrabungen der Monumente und Kunstwerke in Herculaneum und Pompeji zu einer neuen Hochphase der Antikenbegeisterung führten. Doch auch die große Offenheit bezüglich (männlicher) homoerotischer Beziehungen stellte für viele Persönlichkeiten im Zeitalter der Aufklärung ein Ideal fernab der eigenen Lebenswirklichkeit dar.', 3, 1)
,('Heldinnen der Tugend', 'DER ZWEITE BLICK - Spielarten der Liebe.', 'Die vierte Route führt zu Darstellungen von weiblicher Intimität und erotischer Liebe unter Frauen.', 'Die Rolle der Frau in der Gesellschaft hat sich im Laufe der Geschichte kaum gewandelt. Ihr Alltag beschränkte sich meist auf das Dasein als Mutter und auf das religiöse Leben. Für gewöhnlich war eine Frau zunächst der Vormundschaft ihres Vaters und nach der Heirat der Autorität ihres Ehemanns unterstellt. Die gesellschaftliche Stellung einer Frau, die unabhängig bleiben wollte, war an ihren persönlichen Wohlstand gekoppelt. Nur sehr wenige Frauen hatten jedoch hinreichend eigenes Geld, zudem rief ökonomischer Wohlstand keineswegs immer auch automatisch einen höheren sozialen Status hervor. Warum aber wollten manche Frauen trotz begrenzter sozialer Perspektiven dennoch nicht heiraten? Hierfür gab es zahlreiche Motive. Eines davon war fraglos die Verweigerung einer heterosexuellen Beziehung.', 4, 1)
,('Grenzüber­schreitungen', 'DER ZWEITE BLICK - Spielarten der Liebe.', 'Die fünfte Route setzt sich mit der Frage auseinander, inwieweit die Zuordnung zu einem Geschlecht sich immer aufrechterhalten lässt.', 'Wandlungen und Mehrdeutigkeiten im Hinblick auf die Geschlechtszugehörigkeit sind als Themen in der Sammlung des Bode-Museums umfassend präsent. Unabhängig davon, ob Kunstwerke christliche oder mythologische Motive aufweisen, bezeugen sie regelmäßig den seit jeher vorhandenen Drang zur Darstellung sämtlicher Spielarten der Liebe. ', 5, 1)
;

INSERT INTO smb.tours_objects(id, "sequence", tour_id, object_id, room) VALUES 
-- tour 1
 (11, 1, 1,  869230, 'Raum 111')
,(12, 2, 1,  867777, 'Raum 110')
,(13, 3, 1,  871959, 'Raum 131')
,(14, 4, 1,  868225, 'Raum 240')
,(15, 5, 1,  871048, 'Raum 218')
,(16, 6, 1, 1409065, 'Raum 213')
-- tour 2
,(21, 1, 2, 1368651, 'Raum 121')
,(22, 2, 2,  867248, 'Raum 072/073')
,(23, 3, 2,  863088, 'Raum 239')
,(24, 4, 2,  863675, 'Raum 219')
,(25, 5, 2, 1363213, 'Raum 261 (Tiepolo-Raum)')
-- tour 3
,(31, 1, 3, 1368422, 'Raum 132')
,(32, 2, 3,  870381, 'Kleine Kuppel')
,(33, 3, 3, 2440904, 'Raum 257')
-- tour 4
,(41, 1, 4, 867928, 'Raum 124')
,(42, 2, 4, 871677, 'Raum 134')
,(43, 3, 4, 866482, 'Raum 107')
,(44, 4, 4, 870118, 'Raum 139')
-- tour 5
,(51, 1, 5, 870347, 'Raum 107')
,(52, 2, 5, 864792, 'Raum 215')
,(53, 3, 5, 869230, 'Raum 209')
,(54, 4, 5, 867376, 'Raum 209')
;
SELECT setval('smb.topics_objects_id_seq', 55); -- MAX(id) + 1


INSERT INTO smb.tours_objects_translation(tour_object_id, language_id, abstract, description) VALUES 
 (11, 1, 'Das Ideal des Soldaten wird zumeist mit dem Bild des heterosexuellen Mannes assoziiert. Andere sexuelle Orientierungen scheinen darin keinen Platz zu finden. Dabei handelt es sich jedoch um ein Klischee der jüngeren Zeit, das im Hinblick auf Darstellungen der klassischen Heroen schnell zu falschen Schlüssen verleiten kann.', 'In der Antike ging Heldentum Hand in Hand mit Bisexualität. Diese wurde in den Armeen durchaus positiv gesehen, weil sie die emotionalen Bindungen unter den Soldaten festigen und hierdurch Kampfgeist und Moral stärken sollte. Die wichtigsten militärischen Helden der griechischen und römischen Mythologie folgten dementsprechend dieser sexuellen Orientierung.

Mit dem wiedererstarkten Interesse an der Antike seit der Renaissance (frz. »Wiedergeburt«, ca. 15./16. Jh.) konnten die bildenden Künste auf eine von der christlichen Religion unabhängige Ikonographie zurückgreifen, in der sich Nacktheit und Homoerotik freier ausdrücken ließen. Anders als bei den Soldatenheiligen konnte man bei den »heidnischen« Helden Liebe und physische Nähe – Bisexualität eingeschlossen – offener zeigen. Neben Apollo zählten der Kriegsgott Mars (griechisch Ares) und der Halbgott Herkules (griechisch Herakles) in der klassischen Mythologie zu den wichtigsten Personifikationen für Kampfeslust. Auch sie hatten unzählige hetero- und homosexuelle Liebesverhältnisse, die als Ausdruck ihrer Manneskraft verstanden wurden. Apollo, der in der griechisch-römischen Mythologie das Ideal männlicher Schönheit repräsentierte, galt unter anderem als der Gott der Sonne, der Dichtkunst, der Pest und der Heilkunst. Üblicherweise wurde er als attraktiver und nur mit einem Umhang bekleideter junger Mann dargestellt, wie in der von Ludwig Münstermann geschaffenen Schnitzarbeit. Die Liste der männlichen Liebhaber Apolls ist mindestens so lang wie die seiner weiblichen.

Der göttliche Bogenschütze Apollo galt auch als Befreier von Seuchen; diese Verknüpfung wurde in der Figur des heiligen Sebastian gleichsam christianisiert. Spätestens im 19. Jahrhundert wurde der heilige Sebastian so schließlich ein homoerotisches Ideal und zudem ein Prototyp des von einer homophoben Gesellschaft Gepeinigten.')
,(12, 1, 'Das Ideal des Soldaten wird zumeist mit dem Bild des heterosexuellen Mannes assoziiert. Andere sexuelle Orientierungen scheinen darin keinen Platz zu finden. Dabei handelt es sich jedoch um ein Klischee der jüngeren Zeit, das im Hinblick auf Darstellungen der klassischen Heroen schnell zu falschen Schlüssen verleiten kann.', 'In der Antike ging Heldentum Hand in Hand mit Bisexualität. Diese wurde in den Armeen durchaus positiv gesehen, weil sie die emotionalen Bindungen unter den Soldaten festigen und hierdurch Kampfgeist und Moral stärken sollte. Die wichtigsten militärischen Helden der griechischen und römischen Mythologie folgten dementsprechend dieser sexuellen Orientierung. Mit dem wiedererstarkten Interesse an der Antike seit der Renaissance (frz. »Wiedergeburt«, ca. 15./16. Jh.) konnten die bildenden Künste auf eine von der christlichen Religion unabhängige Ikonographie zurückgreifen, in der sich Nacktheit und Homoerotik freier ausdrücken ließen.

Der Halbgott Herkules (griechisch Herakles) war Sohn des obersten Gottes Jupiter (griechisch Zeus) und als größter aller klassischen Helden ein Muster an Männlichkeit. Größer und stärker als jeder andere Sterbliche, spielte er eine zentrale Rolle im Krieg zwischen den Trojanern und den Griechen, von dem Homer in der Ilias berichtet (8. Jh. v. Chr.). Herkules hatte mehrfach gleichgeschlechtliche Affären mit Kriegsgefährten und jüngeren Männern, die er als Soldaten ausbildete. Dargestellt wurde er für gewöhnlich eine Keule haltend und mit einem außerordentlich muskulösen Körper versehen, der nackt oder nur teilweise mit einem Löwenfell bekleidet war. Diese Ikonographie festigte der 1546 in Rom aufgefundene Herkules Farnese, eine im 3. Jahrhundert angefertigte Kopie einer Skulptur des berühmten griechischen Bildhauers Lysippus. Herkules’ Pose und seine enorme Muskulatur wurden bewundert und beeinflussten die Kunst des 16. und 17. Jahrhunderts, wie anschaulich in der Arbeit von Pierre Puget zu sehen ist. Über die Zeit hinweg blieb Lysippus’ Schöpfung eines männlichen Idealkörpers eine Standardikonographie für Homoerotik.')
,(13, 1, 'Das Ideal des Soldaten wird zumeist mit dem Bild des heterosexuellen Mannes assoziiert. Andere sexuelle Orientierungen scheinen darin keinen Platz zu finden. Dabei handelt es sich jedoch um ein Klischee der jüngeren Zeit, das im Hinblick auf Darstellungen der klassischen Heroen schnell zu falschen Schlüssen verleiten kann.', 'In der Antike ging Heldentum Hand in Hand mit Bisexualität. Diese wurde in den Armeen durchaus positiv gesehen, weil sie die emotionalen Bindungen unter den Soldaten festigen und hierdurch Kampfgeist und Moral stärken sollte. Die wichtigsten militärischen Helden der griechischen und römischen Mythologie folgten dementsprechend dieser sexuellen Orientierung. Mit dem wiedererstarkten Interesse an der Antike seit der Renaissance (frz. »Wiedergeburt«, ca. 15./16. Jh.) konnten die bildenden Künste auf eine von der christlichen Religion unabhängige Ikonographie zurückgreifen, in der sich Nacktheit und Homoerotik freier ausdrücken ließen.

Als Kriegsgott galt Mars (griechisch Ares) in der Antike als das wichtigste Vorbild für Männlichkeit. Üblicherweise wurde er muskulös, in forscher Pose und ausgestattet mit Kriegsattributen wie Speer, Helm oder Schild dargestellt. Häufig symbolisierte ein Verzicht auf Rüstung oder Kleidung noch zusätzlich die Furchtlosigkeit des Gottes. Diese Tradition fand in der Renaissance eine Fortsetzung, wie anschaulich im Mars gradivus von Giambologna zu sehen ist. Seit dem 18. Jahrhundert werden Speer und Schild des Kriegsgotts international als Symbol für das männliche Geschlecht benutzt: ♂. Der Spiegel seiner Gattin Venus (griechisch Aphrodite), der Göttin der Schönheit, repräsentiert hingegen das weibliche Geschlecht: ♀. Seine Ehe mit der schönsten aller Göttinnen hielt Mars allerdings nicht davon ab, zahlreiche Affären mit sterblichen Männern einzugehen.')
,(14, 1, 'Das Ideal des Soldaten wird zumeist mit dem Bild des heterosexuellen Mannes assoziiert. Andere sexuelle Orientierungen scheinen darin keinen Platz zu finden. Dabei handelt es sich jedoch um ein Klischee der jüngeren Zeit, das im Hinblick auf Darstellungen der klassischen Heroen schnell zu falschen Schlüssen verleiten kann.', 'Unter den von der Kirche häufiger herangezogenen Beispielen für Ritterlichkeit ist jenes des heiligen Sebastian aufgrund des historischen Wandels seiner Ikonographie besonders interessant. Nach Auskunft einer der wichtigsten mittelalterlichen Quellen zum Leben der Heiligen, der auf das 13. Jahrhundert zurückgehenden Legenda Aurea (Goldene Legende), war Sebastian ein römischer Soldat, der im 3. Jahrhundert lebte. Er kommandierte die erste Kohorte der persönlichen Eskorte des Kaisers. Sebastian wurde infolge seiner Konversion zum Christentum aus der Armee entlassen. Daraufhin verpflichtete er sich seinen Mitchristen gegenüber so wie ein Soldat gegenüber seinen Mitstreitern. Er begleitete mehrere Märtyrer durch ihre Folter, unterstützte sie im Kampf gegen die Versuchung und bestärkte sie darin, durch das Martyrium zu Gott zu gelangen. Schließlich durchlitt Sebastian selbst ein Martyrium, bei dem er erst von Pfeilen durchbohrt und dann erschlagen wurde.

Im Mittelalter wurde Sebastian anfänglich häufig als Soldat in Rüstung gezeigt, die Pfeile als Symbol seines Martyriums entweder in der Hand haltend oder von ihnen durchbohrt. Um die Wende vom 13. zum 14. Jahrhundert begann man, ihn als hübschen und nur halb bekleideten Jüngling darzustellen. Diese Entwicklung war das Resultat einer Kombination der christlichen Darstellungstradition mit dem in jener Zeit in der westlichen Hemisphäre wiedererweckten Interesse an Mythen und Kultur der Antike. Es war der Beginn einer neuen Epoche, der sogenannten Renaissance (frz. »Wiedergeburt«, ca. 15./16. Jh.). Man bemühte sich darum, neue wissenschaftliche Erkenntnisse mit den Werten der alten Griechen und Römer sowie mit den Lehren des katholischen Glaubens in Einklang zu bringen. Dieses Spannungsverhältnis zwischen idealisiertem antikem »Heidentum« sowie dem Christentum hielt bis in das 18. Jahrhundert an und gab Anlass zu immer neuen Interpretationen. So wurden die Geschichten der antiken Helden und christlichen Heiligen ständig neu reflektiert und in zahlreichen Fällen sogar in bildlichen Darstellungen miteinander verwoben.

Ein wichtiges Kennzeichen jener Epoche ist ein starker Bezug zum Diesseits. Wie in dem Schnitzwerk des Meisters der Biberacher Sippe gut zu erkennen ist, wurden etwa Sebastians physische Erscheinung und Nacktheit nun so wichtig, dass sie begannen, seine Bedeutung als tugendhafter Beschützer zu überstrahlen. Zugleich rückte Sebastian in die Rolle eines Schutzheiligen gegen die Pest, die man in dem Pfeilhagel versinnbildlicht sah. Diese Verbindung des von Pfeilen durchbohrten Märtyrers mit der Pest ergab sich jedoch nicht intuitiv. In der griechisch-römischen Mythologie galt der göttliche Bogenschütze Apollo (bisexuell und Inbegriff männlicher Schönheit) als Befreier von Seuchen; diese Verknüpfung wurde in der Figur des heiligen Sebastian gleichsam christianisiert. Spätestens im 19. Jahrhundert wurde Sebastian schließlich ein homoerotisches Ideal und zudem ein Prototyp des von einer homophoben Gesellschaft Gepeinigten. ')
,(15, 1, 'Das Ideal des Soldaten wird zumeist mit dem Bild des heterosexuellen Mannes assoziiert. Andere sexuelle Orientierungen scheinen darin keinen Platz zu finden. Dabei handelt es sich jedoch um ein Klischee der jüngeren Zeit, das im Hinblick auf Darstellungen der klassischen Heroen schnell zu falschen Schlüssen verleiten kann.', 'Intensive Bindungen zwischen Männern verkörperten auch in der mittelalterlichen Gesellschaft ein kraftvolles Ideal, das sowohl im weltlichen wie auch im spirituellen Sinne glorifiziert wurde – allerdings nie mit eindeutiger sexueller Konnotation. Die Feudalgesellschaft der Zeit vom 9. bis zum 14. Jahrhundert basierte auf einem System von Loyalitäten und persönlicher Unterstützung. Nobilitiert wurde dieses System vom Geist der militärischen Ehrenhaftigkeit – der Ritterlichkeit. Sie wurde zur Grundlage tiefempfundener Kameradschaft zwischen den Kriegern. Dieses Ideal wurde auf die Kirche ausgeweitet, deren Klöster als brüderliche Gemeinschaften organisiert waren. Sie folgten dem Wort des heiligen Paulus, der den »guten Christen« als »guten Streiter Jesu Christi« bezeichnet hatte.

Im 13. Jahrhundert veranlassten zunehmende politische Spannungen und der Niedergang des Feudalismus weltliche und religiöse Führer dazu, ihre Kontrolle auf alle Lebensbereiche ihrer Untergebenen auszuweiten, die Sexualität eingeschlossen. Homoerotische Dichtkunst verschwand praktisch komplett, doch ironischerweise wurden mehr Bilder mit Darstellungen von Liebe oder tabuisiertem Verhalten denn je geschaffen. Viele von ihnen sollten zwar erbauliche religiöse oder ritterliche Vorbilder präsentieren, boten sich aber für zweideutige Lesarten an. Zudem waren spirituelle und fleischliche Liebe nicht immer scharf getrennt. Eine um 1310 entstandene Eichenholzgruppe aus dem Bodenseegebiet veranschaulicht mit dem Motiv des seinen Kopf an Christi Brust lehnenden heiligen Johannes besonders eindrücklich ein seinerzeit häufig aufgegriffenes Beispiel männlicher Intimität. Die Darstellung bezieht sich auf einen Evangelientext und zeigt den Apostel Johannes in einer Pose, die der des zentralen Soldatenpaars in den Vierzig Märtyrern von Sebaste stark ähnelt. Jesus ist als bärtiger Mann dargestellt, der seinen – wie es im Johannesevangelium heißt – »geliebten Jünger« zärtlich im Arm hält. Figurengruppen in dieser Art erinnerten häufig in Frauenklöstern an Johannes’ innige Verehrung für Jesus. Die androgynen Züge von Ersterem ermöglichten es den Nonnen, sich als »mystische Bräute Christi« mit dem Heiligen zu identifizieren.')
,(16, 1, 'Das Ideal des Soldaten wird zumeist mit dem Bild des heterosexuellen Mannes assoziiert. Andere sexuelle Orientierungen scheinen darin keinen Platz zu finden. Dabei handelt es sich jedoch um ein Klischee der jüngeren Zeit, das im Hinblick auf Darstellungen der klassischen Heroen schnell zu falschen Schlüssen verleiten kann.', 'Zwischen dem 9. und dem 10. Jahrhundert näherte sich Europa langsam wieder jener wirtschaftlichen Prosperität an, die es nach dem Untergang des Weströmischen Reichs im Jahr 476 verloren hatte. Es begann eine Phase sozialer Stabilität, die zu steigenden Bevölkerungszahlen und wachsenden Städten führte. Zum ersten Mal seit der römischen Zeit erreichten einige Städte wieder Dimensionen, die soziale Freiräume und damit die Möglichkeit zur Entwicklung homosexueller Netzwerke boten. Begleitet wurden diese Entwicklungen von einer aufblühenden erotischen Literatur. Insbesondere die weltlichen Stadtoberen pflegten häufig eine Kultur der Freiheit, und es entstanden zahlreiche, zumeist noch in lateinischer Sprache verfasste Gedichte mit homoerotischen Inhalten. Im Gegensatz zur Dichtkunst, die auch innerhalb einer privaten Subkultur aufblühen konnte, waren solche Entwicklungen bei den bildenden Künsten kaum möglich. Malerei und Bildhauerkunst waren auf Werkstätten und hohen Kapitaleinsatz angewiesen. Kirche und Adel, als die vornehmlichen Auftraggebenden für Kunstwerke, lehnten die Zurschaustellung von Homosexualität jedoch ab beziehungsweise fürchteten Strafen für deren Förderung. Gleichgeschlechtliche Intimität findet sich in dieser Zeit einzig in religiösen Sujets, wobei eine erotische Komponente, wenn überhaupt, nur unterschwellig präsent ist.

Insbesondere die Darstellung christlicher Soldaten bot die Gelegenheit, wenn schon nicht offene Homosexualität so doch zumindest physische Nähe und Zuneigung unter Männern zu zeigen. Im Museum für Byzantinische Kunst im Bode-Museum findet sich beispielsweise eine der bekanntesten Darstellungen der Vierzig Märtyrer von Sebaste. Der Legende zufolge wurden die vierzig Soldaten aufgrund ihres Bekenntnisses zum Christentum dazu verurteilt, unbekleidet eine Nacht auf einem zugefrorenen See zu verbringen. Da man üblicherweise den Augenblick kurz vor dem Erfrieren der Verurteilten illustrierte, bot sich hier die seltene Gelegenheit zur Darstellung einer Gruppe von Männern, die sich umarmten und sich so Wärme und Trost spendeten.')
,(21, 1, 'Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis, das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung.', 'Viele der bedeutendsten Künstler*innen der Renaissance zeigten sich von den Theorien des Philosophen Marsilio Ficino (1433–1499) beeinflusst, der den Text Symposium des griechischen Philosophen Platon (428/427–348/347 v. Chr.) übersetzt und den sogenannten Neoplatonismus initiiert hatte. Nach Ficinos komplexer Interpretation von Platons Text ist Liebe das Produkt des Wunschs nach Schönheit, der in konsequenter Verfolgung letztlich zur Göttlichkeit – und somit zu Gott – führe. Begehren enthielte demzufolge eine stark religiöse Konnotation. Für Ficino war es darüber hinaus naheliegend, dass ein Mann sich mehr von Männern als von Frauen angezogen fühlen sollte, weil er so an seine eigene innere Schönheit erinnert würde. Mit dieser These leistete Ficino einen Beitrag zur Legitimation von Homosexualität und förderte zugleich die für die Renaissancekunst typische Suche nach Androgynität als physischer Vereinigung von Kühnheit und Grazie.

Donatello gilt als einer der Väter der Renaissance. In seinen skulpturalen Arbeiten paarte er klassische Sinnlichkeit mit christlicher Moral und Humanismus. Seine Skulpturen der biblischen Figur des Davids illustrieren zum ersten Mal die neoplatonische Vorstellung von Liebe. In der Version im BodeMuseum ist David nur mit einem Umhang und einer sehr kurzen Tunika bekleidet, die sein rechtes Bein bis zur Hüfte enthüllt. Der Fokus auf Davids attraktiven männlichen Körper wird noch durch die leicht gedrehte Hüfte und das angehobene linke Bein unterstrichen.

Gemäß dem Alten Testament tötete David als junger Schäfer Goliath, den furchterregenden Anführer der die Israeliten bedrohenden Philister. Kurz darauf entwickelte David eine enge Freundschaft mit Jonatan, dem Sohn König Sauls, und der Bibel zufolge »verband sich das Herz Jonatans mit dem Herzen Davids, und Jonatan gewann ihn lieb wie sein eigenes Leben. Und Saul nahm ihn an diesem Tage zu sich und ließ ihn nicht wieder in seines Vaters Haus zurückkehren. Und Jonatan schloss mit David einen Bund, denn er hatte ihn lieb wie sein eigenes Leben«. Aus Neid auf Davids Kampferfolg und wegen dessen Einflusses auf seinen Sohn befahl König Saul jedoch die Ermordung Davids. Dieser und Jonatan »küssten einander und weinten miteinander«, weil David nun fliehen musste. Als er später vom Tode Sauls und Jonatans erfuhr, beweinte David Letzteren: »ich habe große Freude und Wonne an dir gehabt; deine Liebe ist mir wundersamer gewesen, als Frauenliebe ist«.

Aufgrund Davids historischer und religiöser Bedeutung als einer der wichtigsten Figuren von Judentum, Islam und Christentum waren diese Bibelstellen wohlbekannt. Seine Beziehung zu Jonatan wurde in der Kunst oft genutzt, um gleichgeschlechtliches Begehren darzustellen. Donatello, gemäß verschiedener Quellen wahrscheinlich selbst homosexuell, war natürlich nicht der erste Künstler, der König David darstellte. Aber er war sehr wohl der erste, der ihn als attraktiven und zu einem gewissen Grad androgynen Jüngling präsentierte.')
,(22, 1, 'Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis, das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung.', 'Im daraufhin einsetzenden Diskurs über Tugend, Begehren, Sinnlichkeit und sexuelle Freizügigkeit verlor die christliche Verdammung weltlicherFreuden zunehmend an Bedeutung. Mit dem Rückbezug auf die Kulturerzeugnisse der Antike entwickelten die Schriftsteller*innen und Künstler- *innen des Humanismus auch ein Interesse für die Thematik der männlichen Homosexualität, die in den seinerzeitigen Kunstwerken, Chroniken und »heidnischen« Göttergeschichten (bekannt als Mythen) eine prominente Rolle gespielt hatte. Auch wenn nicht jede/r Humanist*innen homosexuell war, so zeigten doch viele von ihnen ein Interesse an der Auseinandersetzung mit Homoerotik.

Seit der Renaissance offenbarten auch solche männliche Künstler, die – zumindest nach unserem heutigen Verständnis – vermutlich selbst nicht homosexuell waren, mancherlei Interesse an homoerotischen Inhalten. Ein besonders prominenter Fall ist Albrecht Dürer (1471–1528).

Dürer war der bedeutendste Maler, Druckgrafiker und Zeichenkünstler der deutschen Renaissance. Seine Arbeiten inspirierten viele andere deutsche Künstler*innen wie Hans Daucher, der Dürer in seinem Relief Allegorie der Tugend sogar abbildete. Hier wird Dürer mit seinem charakteristischen langen Haar und in einem der von ihm bevorzugten, eleganten Gewänder gezeigt. In der Gegenwart von acht Bezeugenden, unter denen Herkules und König David auszumachen sind, besiegt er einen Gegner, der den Neid darstellt.

Dürer war verheiratet und bekannte sich nie zur Homosexualität. Und dennoch enthält seine Korrespondenz mit seinem Freund, dem Humanisten Willibald Pirckheimer (1470–1530), spitzzüngige Bemerkungen zu diesem Thema. Während Dürer sich beispielsweise über die Vorliebe seines Freundes für italienische Soldaten und deutsche Mädchen mokierte, notierte vermutlich Pirckheimer in Griechisch auf einer heute im Kupferstichkabinett der Staatlichen Museen zu Berlin verwahrten Zeichnung Dürers: »Mit dem Schwanz eines Mannes in deinen Anus hinein«. Einige von Dürers Zeichnungen und Drucken zeigen die homosexuelle humanistische Subkultur, mit der er während seiner zwei Reisen nach Italien (1494/95 und 1505–07) in Kontakt gestanden haben dürfte.')
,(23, 1, 'Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis, das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung.', 'Natürlich gab es auch schon vor dem 14. Jahrhundert homosexuelle Künstler*innen. Aber erst jetzt war die westliche Gesellschaft zum ersten Mal seit dem Untergang des Römischen Reichs wieder flexibel genug, homoerotische Kunstwerke zu akzeptieren. Trotz fortbestehender sozialer und religiöser Widerstände wurde männliche Homosexualität auch wieder teilweise toleriert.

Leonardo da Vinci – Künstler, Ingenieur, Wissenschaftler und Erfinder – gilt als Paradebeispiel des Universalgelehrten der Renaissance. Er begann seine Karriere in der Florentiner Werkstatt des offen homosexuellen Malers und Bildhauers Andrea Verrocchio (1435/36– 1488), die sich durch besondere künstlerische Experimentierfreude auszeichnete. 1476 wurde Leonardo wegen zu großer Nähe zu einem jungen männlichen Modell zweimal homosexueller Handlungen beschuldigt. Obwohl diese Vorwürfe fallen gelassen wurden, begleitete ihn der Ruf der Homosexualität bis ans Ende seines Lebens. Leonardos Kunstwerke und seine rund 2000 Seiten umfassenden Notizen wurden eingehend unter dem Gesichtspunkt seiner angenommenen Homosexualität untersucht, unter anderem vom Begründer der Psychoanalyse, Sigmund Freud (1856–1939). In seiner künstlerischen Tätigkeit widmete sich Leonardo der Suche nach dem Androgynen, einer Verschmelzung von männlichen Merkmalen und gerundeten weiblichen Formen. Dies charakterisiert auch die Skulptur der römischen Göttin Flora, die wahrscheinlich das Werk eines nahestehenden Nachfolgers ist. Flora, Symbolfigur für Pflanzenblüte und Frühlingszeit, ist an ihren Brüsten als Frau erkennbar, aber ihre kräftigeren Arme und Schultern vermitteln Maskulinität. Ihre Gesichtszüge und sogar ihre Locken folgen jenen in Leonardos Gemälde Johannes der Täufer (heute im Musée du Louvre, Paris), dessen Modell ein »Salai« (kleiner Teufel) genannter männlicher Lehrling in Leonardos Werkstatt gewesen sein könnte.')
,(24, 1, 'Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis, das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung.', 'Der Humanismus als Geistesströmung erreichte seinen Höhepunkt um 1500 zur Zeit der Renaissance, deren Bezeichnung sich wörtlich auf die »Wiedergeburt« der griechischen und römischen Kultur bezieht. Ihr künstlerischer Ursprung lag in Florenz, das als eine der dynamischsten Metropolen Europas offensichtlich auch über eine bekannte homosexuelle Subkultur verfügte, in der Angehörige aller sozialen Schichten vereint waren. In Deutschland benutzte man daher etwa den Begriff »Florenzer« als Synonym für homosexuelle Männer.

In der Hochrenaissance (1490er–1530er Jahre) investierten Päpste wie Clemens VII. (1478–1534) und Julius II. (1443– 1513) enorme Geldsummen, um Rom zur neuen kulturellen Kapitale der westlichen Welt zu machen. Florenz verlor hierdurch seine künstlerische Vormachtstellung, wenngleich Künstler wie Michelangelo zunächst weiterhin zum Glanz beider Städte beitrugen. Michelangelo – Bildhauer, Maler, Architekt und Dichter – war von zentraler Bedeutung für die Entwicklung der westlichen Kunst und gilt noch heute als einer der größten Künstler aller Zeiten. Als gläubiger Christ war Michelangelo indes gespalten zwischen seiner mühsam unterdrückten Homosexualität und der Angst vor Bestrafung hierfür. Dieses Dilemma aus Religiosität und verbotenen sexuellen Begierden scheint zu seinem introspektiven und selbstquälerischen Charakter beigetragen zu haben. Im Gegensatz zu Donatello und Leonardo da Vinci führte ihn die Suche nach Schönheit im männlichen Körper zur Schaffung von Kunstwerken mit ausgeprägter Maskulinität. Muskulosität und Spannung prägen die meisten seiner Kompositionen, selbst bei der Darstellung von Frauen.

In einer Skulptur des Bode-Museums setzte ein/e anonyme/r Künstler *in des beginnenden 17. Jahrhunderts eine Zeichnung von Michelangelo in Bronze um. Die Zeichnung sollte als Vorlage für eine monumentale Skulptur dienen, die den biblischen Helden Samson während des Kampfes gegen die Philister zeigt. Hierfür stellte Michelangelo drei Männer dar, die in einer Art spiralförmiger Umarmung ineinander verschlungen sind. Die Intensität ihrer Bewegungen, die zur Schau gestellte Nacktheit und die Anspannung der Körper erinnern eher an eine sexuelle Handlung als an einen Kampf.')
,(25, 1, 'Im 14. Jahrhundert verbreitete sich von Italien ausgehend in ganz Europa ein neues kulturelles Weltverständnis, das auf dem Wiederbeleben der klassischen Antike beruhte: der Humanismus. Eine neue Lesart antiker Literatur sowie ein erwachendes Interesse an klassischer Kunst, Philosophie und Wissenschaft rückten den Menschen in das Zentrum der Aufmerksamkeit. Die Welt wurde nun hinsichtlich menschlicher Werte betrachtet und der mittelalterliche Theozentrismus (Ausrichtung aller Lebensbereiche auf Gott als universalem Zentrum) verlor langsam an Bedeutung.', '1620 wurde in Rom eine antike griechische Marmorskulptur gefunden, deren Ursprung vermutlich im 3. Jh. v. Chr. liegt. Trotz zahlreicher Schäden – so fehlten ihr etwa beide Beine und ein Arm – galt sie schon bald als eine der Glanzleistungen antiker Bildhauerkunst. Lange Zeit befand sie sich im Besitz einer berühmten römischen Familie, was sich im Titel der heute in der Münchener Glyptothek verwahrten Figur niederschlug: Der Barberinische Faun. Wie ihre griechischen Vorläufer, die Satyrn, waren Faune ein wiederkehrendes Motiv in der Antike und hatten ihren Ursprung in einer Figur der griechischen Mythologie namens Pan. In der römischen Mythologie sah man sie traditionellerweise als betrunkene und verschrobene Gefährten von Bacchus, dem Gott des Weines.

Wie im byzantinischen Marmorrelieffragment Pan im Rankenwerk (11. Jh.) wurden Faune oft tanzend dargestellt, man zeigte sie aber auch gerne an den Folgen ihres exzessiven Lebens leidend. Letzteres ist der Fall beim Barberinischen Faun: Den rechten Arm unter dem Kopf und den linken an seiner Seite herabhängend, liegt er betrunken mit geschlossenen Augen da. Mit gespreizten Beinen präsentiert er zugleich seine völlige Nacktheit wie auch seinen gutgebauten Körper. Offenbar scheint er sich schamlos dem Moment hinzugeben. 1799 kam der Barberinische Faun vorübergehend in den Besitz des Sammlers und Künstlers Vincenzo Pacetti. Dieser nutzte die Gelegenheit, um die bereits zuvor mehrfach ergänzte Skulptur erneut zu überarbeiten – eventuell, um sie hinterher gewinnbringend zu verkaufen. Indem er das rechte Bein deutlich anhob, verstärkte er nochmals deren ohnehin schon deutlich erotische Pose. In diesem Zusammenhang entstand auch ein Terrakotta-Modell des Fauns, das sich heute im Bode-Museum befindet.')
,(31, 1, 'Die gesellschaftlichen und kulturellen Errungenschaften der griechischen und römischen Antike wurden in späteren Zeiten oftmals als vorbildlich empfunden. Eine besondere Wertschätzung erfuhren sie im 18. Jahrhundert, als die archäologischen Ausgrabungen der Monumente und Kunstwerke in Herculaneum und Pompeji zu einer neuen Hochphase der Antikenbegeisterung führten. Doch auch die große Offenheit bezüglich (männlicher) homoerotischer Beziehungen stellte für viele Persönlichkeiten im Zeitalter der Aufklärung ein Ideal fernab der eigenen Lebenswirklichkeit dar.', 'Anders als in den christlichen Gesellschaften des Mittelalters und der Frühen Neuzeit, die Homosexualität als widernatürlich verurteilten, begegnete man der (männlichen) gleichgeschlechtlichen Liebe in der Antike mit größerer Toleranz und teilweise sogar Anerkennung. Dies galt insbesondere für Freundschaften von jungen Männern mit älteren Mentoren, die zugleich intellektueller und sexueller Natur waren. Legendär ist die öffentlich zelebrierte Liebe des römischen Kaisers Hadrian (76–138 n. Chr.) zum jungen Antinous (um 110–130 n. Chr.): Nachdem dieser unter tragischen Umständen während eines Bootsausflugs auf dem Nil ertrunken war, ließ Hadrian den Geliebten in mehreren ihm geweihten Tempeln als Gott verehren. Zudem ließ er sein Abbild hundertfach in Stein meißeln, in Bronze gießen und auf Münzen prägen. In späteren Jahrhunderten standen jene Antinous-Bildnisse bei Kunstinteressierten und Sammlern hoch im Kurs, ganz besonders im 18. Jahrhundert, als mit den Ausgrabungen der antiken Monumente und Kunstwerke in Herculaneum und Pompeji unter Intellektuellen und Kunstfreunden eine große Antikenbegeisterung einsetzte.

Auch viele der damaligen Künstler schulten sich an den als ideal empfundenen Proportionen der antiken Statuen. Unter ihnen befand sich der flämische Bildhauer François Duquesnoy (1597– 1643), von dessen Hand das Bode-Museum eine Antinous-Figurine aus Bronze besitzt. Für diese hatte der Künstler die berühmte antike Marmorskulptur des sogenannten Antinous vom Belvedere (Vatikanische Museen; heute als Hermes identifiziert) zum Vorbild genommen. Auf diese Weise wurde der schöne Jüngling zu einer der bis heute bekanntesten Persönlichkeiten der römischen Antike und zudem zur Identifikationsfigur für eine Zeit und Gesellschaftsordnung, in der homoerotische Beziehungen unter bestimmten Voraussetzungen öffentlich gelebt werden konnten und sogar gesellschaftlich anerkannt waren.')
,(32, 1, 'Die gesellschaftlichen und kulturellen Errungenschaften der griechischen und römischen Antike wurden in späteren Zeiten oftmals als vorbildlich empfunden. Eine besondere Wertschätzung erfuhren sie im 18. Jahrhundert, als die archäologischen Ausgrabungen der Monumente und Kunstwerke in Herculaneum und Pompeji zu einer neuen Hochphase der Antikenbegeisterung führten. Doch auch die große Offenheit bezüglich (männlicher) homoerotischer Beziehungen stellte für viele Persönlichkeiten im Zeitalter der Aufklärung ein Ideal fernab der eigenen Lebenswirklichkeit dar.', 'Zu den Kunstbegeisterten des 18. Jahrhunderts gehörte auch der Antiquar und Antikensammler Philipp Stosch (1691–1757), der für seine diplomatischen Verdienste vom römisch-deutschen Kaiser Karl VI. (1685-1740) zum Baron geadelt wurde. Er verbrachte die zweite Hälfte seines Lebens in Italien, wo er zunächst in Rom und später Florenz lebte und sich einen Namen als Kunstkenner und -sammler machte. Die Porträtbüste, die der französische Bildhauer Edmé Bouchardon während seines zehnjährigen Romaufenthaltes von Stosch anfertigte, zeigt den Baron dementsprechend in Anmutung und Gewandung eines römischen Kaisers, die die intellektuelle Bezugswelt des Dargestellten spiegelt. Ebenso darf man aber vermuten, dass in Stoschs Porträtbüste auch das Ideal der Homosexualität als Teil der Erziehung antiker Herrscher anklingt, denn seine Neigung zum eigenen Geschlecht war Wegbegleiter*innen und engen Freunde*innen kein Geheimnis, obschon der Baron sie nicht öffentlich auslebte.

Als Philipp von Stosch kurz vor seinem Tod Johann Joachim Winckelmann (1717–1768) kennenlernte, der heute als Begründer der wissenschaftlichen Archäologie und Kunstgeschichte gilt, beauftragte er ihn mit der Erstellung eines Katalogs seiner berühmten Sammlung antiker Gemmen (geschnitzte Halbedelsteine), die nach seinem Tod von König Friedrich II. von Preußen erworben wurde. Beendet wurde das Werk (»Description des pierres gravées du feu Baron de Stosch«, 1760) jedoch erst im Auftrag seines Neffen und Alleinerben Heinrich Wilhelm Muzel-Stosch (1723–1782), der wie sein verstorbener Onkel als Junggeselle lebte und vermutlich ebenfalls dem männlichen Geschlecht zugeneigt war. Vor allem der Briefwechsel mit dem ihm freundschaftlich verbundenen Winckelmann, in dem sich die beiden Männer auf diskrete Weise über ihre erotischen Neigungen austauschten, bestärkt diese Annahme. Im Schwärmen für die antiken Kunstwerke und die Gesellschaften, die diese hervorgebracht hatten, konnten sie relativ frei über die Thematik sprechen. Dies geschah in einer Fusion ästhetischer, intellektueller und erotischer Attraktion über die Bewunderung von Skulpturen antiker Helden und Jünglinge wie etwa Antinous (um 110–130 n. Chr.), dem jugendlichen Geliebten Kaiser Hadrians (76-–138 n. Chr.). Bereits kurz nach Winkelmanns Tod 1767 strebte Heinrich von Stosch die Veröffentlichung ihrer Korrespondenz an. Auch dies kann als Hinweis darauf gelten, dass der Neffe, wie zuvor schon der Onkel, seine sexuellen Präferenzen ebenfalls nicht kategorisch geheim hielt.')
,(33, 1, 'Die gesellschaftlichen und kulturellen Errungenschaften der griechischen und römischen Antike wurden in späteren Zeiten oftmals als vorbildlich empfunden. Eine besondere Wertschätzung erfuhren sie im 18. Jahrhundert, als die archäologischen Ausgrabungen der Monumente und Kunstwerke in Herculaneum und Pompeji zu einer neuen Hochphase der Antikenbegeisterung führten. Doch auch die große Offenheit bezüglich (männlicher) homoerotischer Beziehungen stellte für viele Persönlichkeiten im Zeitalter der Aufklärung ein Ideal fernab der eigenen Lebenswirklichkeit dar.', 'Im Mittelalter und der Frühen Neuzeit war Homosexualität gesellschaftlich nicht anerkannt und wurde von der Kirche verfolgt. Dennoch herrschte zur Zeit der Aufklärung in den intellektuellen und kunstaffinen Zirkeln zumindest eine relative Offenheit für von der gesellschaftlichen Norm abweichende sexuelle Vorlieben. So mussten beispielsweise die antikenbegeisterten Kunstfreunde Philipp Baron von Stosch (1691–1757) und Johann Joachim Winckelmann (1717–1768) ihre Homosexualität vor ihrem direkten Umfeld nicht kategorisch verbergen.

Diese relative Freiheit galt jedoch nicht für Preußens König Friedrich II. (1712–1786), der 1764 die berühmte Stosch’sche Gemmensammlung für den Preußischen Hof erwarb und so den Grundstein für die Berliner Antikensammlung legte. Anders als seine schöngeistigen Zeitgenossen Stosch und Winckelmann oder auch sein jüngeren Bruder Heinrich (1726–1802), dessen Liebe zum Offizier Christian Ludwig von Kaphengst (1740–1800) ein offenes Geheimnis war, musste Friedrich als späterer König und Oberbefehlshaber der preußischen Truppen in kriegerischen Zeiten die an ihn gestellten gesellschaftlichen und dynastischen Forderungen erfüllen. Dieser Anspruch spiegelt sich auch in den meisten Darstellungen des Preußischen Königs wieder, etwa in der Kopie von Johann Gottfried Schadows überlebensgroßer Marmorskulptur in der kleinen Kuppel des Bode-Museums, die ihn in der Pose des strengen Feldherrn zeigt.

Dass Friedrich sich zum eigenen Geschlecht hingezogen fühlte, darf jedoch als sehr wahrscheinlich gelten. So gingen aus seiner Ehe mit Elisabeth Christine von Braunschweig-Wolfenbüttel-Bevern (1715–1797), von der er immer getrennt lebte, keine Nachkommen hervor. Stattdessen pflegte Friedrich zeitlebens besonders vertraute Beziehungen zu einigen Männern seines Hofstaats, was insbesondere seinem Vater, dem als »Soldatenkönig“ bekannten Friedrich Wilhelm I. (1688–1740), ein Dorn im Auge war. Als Schlüsselepisode des zerrütteten Verhältnisses zwischen Vater und Sohn kann die vor Friedrichs Augen durchgeführte Exekution seines Jugendfreunds Hans Hermann von Katte (1704-1730) gelten, der in einen Fluchtversuch des musisch interessierten Kronprinzen vor der harten Zucht des Vaters verstrickt gewesen war.')
,(41, 1, 'Die Rolle der Frau in der Gesellschaft hat sich im Laufe der Geschichte kaum gewandelt. Ihr Alltag beschränkte sich meist auf das Dasein als Mutter und auf das religiöse Leben. Für gewöhnlich war eine Frau zunächst der Vormundschaft ihres Vaters und nach der Heirat der Autorität ihres Ehemanns unterstellt. Die gesellschaftliche Stellung einer Frau, die unabhängig bleiben wollte, war an ihren persönlichen Wohlstand gekoppelt. Nur sehr wenige Frauen hatten jedoch hinreichend eigenes Geld, zudem rief ökonomischer Wohlstand keineswegs immer auch automatisch einen höheren sozialen Status hervor. Warum aber wollten manche Frauen trotz begrenzter sozialer Perspektiven dennoch nicht heiraten? Hierfür gab es zahlreiche Motive. Eines davon war fraglos die Verweigerung einer heterosexuellen Beziehung.', 'Die antike Mythologie – die Geschichten der griechischen und römischen Götter – und die christliche Hagiographie – die Lebensgeschichten der Heiligen – enthalten viele Beispiele von Frauen, die bewusst auf heterosexuelle Beziehungen verzichteten. In beiden Überlieferungen findet man das gleiche Grundschema: Unverheiratete Frauen wurden gesellschaftlich akzeptiert, solange sie die Botschaft von der Tugend der weiblichen Enthaltsamkeit vermittelten.

In der antiken Mythologie steht die Göttin Diana (griechisch Artemis) für die Tugend heterosexueller Enthaltsamkeit, aber sie ist auch ein Musterbeispiel für lesbische Liebe. Wie in der Skulptur von Bernardino Cametti (1669– 1736) wird Diana oft mit durchtrainiertem Körper dargestellt und widmet sich üblicherweise Männern vorbehaltenen Tätigkeiten wie der Jagd. In diesem Fall erinnert ihre verwegene Attitüde an die des klassischen männlichen Helden. Über ihre Zurückweisung von Männern berichtet der römische Dichter Ovid (43 v. Chr.–17 n. Chr.) in seinen Verserzählungen der Metamorphosen. Diana verwandelte demnach Aktaion in einen Hirsch, weil er sie heimlich beim Baden beobachtet hatte. Diese Szene, die Sie auf der gegenüberliegenden Seite dieses Raumes finden, hat Giuseppe Mazza in einem Marmorrelief dargestellt. Während sich Aktaion mit seinem Hirschgeweih im Hintergrund befindet, sitzt im Vordergrund Diana umgeben von ihren Nymphen. Diese sind Naturgeister, die die Gefolgschaft der Göttin bilden und oft in erotischer Zuneigung zueinander dargestellt werden. Andere Kunstwerke zeigen Diana scheinbar frei von jeglicher sexuellen Konnotation, wie zum Beispiel das Trinkgefäß (1600–05) von Paulus Ättinger, das sie beim Reiten eines Hirschs zeigt. Diese Szene kann als Verweis auf Dianas Liebe zur Natur gelesen werden, aber sie erinnert den Betrachter auf subtile Weise auch an ihre Unterwerfung Aktaions.')
,(42, 1, 'Die Rolle der Frau in der Gesellschaft hat sich im Laufe der Geschichte kaum gewandelt. Ihr Alltag beschränkte sich meist auf das Dasein als Mutter und auf das religiöse Leben. Für gewöhnlich war eine Frau zunächst der Vormundschaft ihres Vaters und nach der Heirat der Autorität ihres Ehemanns unterstellt. Die gesellschaftliche Stellung einer Frau, die unabhängig bleiben wollte, war an ihren persönlichen Wohlstand gekoppelt. Nur sehr wenige Frauen hatten jedoch hinreichend eigenes Geld, zudem rief ökonomischer Wohlstand keineswegs immer auch automatisch einen höheren sozialen Status hervor. Warum aber wollten manche Frauen trotz begrenzter sozialer Perspektiven dennoch nicht heiraten? Hierfür gab es zahlreiche Motive. Eines davon war fraglos die Verweigerung einer heterosexuellen Beziehung.', 'Die Rolle der Frauen in der Gesellschaft entwickelte sich mit dem Übergang vom Mittelalter zur Renaissance im 15. Jahrhundert nicht entscheidend weiter. Frauen waren nach wie vor dem Haus zugeordnet oder wurden in Klöstern ausgesondert, und man gestand ihnen nur ein Minimum an Bildung zu. Zugleich eröffnete die Wiederentdeckung der Antike und ihrer Mythen aber neue Möglichkeiten der Darstellung von Frauen und von weiblicher Homosexualität. Verbildlichungen solcher Gesten der Zuneigung unter Frauen wurden paradoxerweise zumeist von Männern als heterosexuell orientierte Anregung in Auftrag gegeben.

Darstellungen weiblicher Intimität wurden oft als ergänzende Bildinhalte in mythologische und religiöse Szenen integriert. Im Sturz des Phaethon von Simone Mosca sind diese Themen vollkommen miteinander verwoben. In der griechischen Mythologie war Phaethon der Sohn des Sonnengottes Helios (lateinisch Sol). Einmal erlaubte ihm der Vater, für einen Tag seinen Sonnenwagen zu lenken. Phaethon konnte jedoch die Pferde nicht im Zaum halten, weshalb der Göttervater Zeus (lateinisch Jupiter) den Wagen mit einem Blitz zertrümmern musste, um die Erde vor dem Verbrennen zu bewahren. Phaethon stürzte in den – hier als alten Mann dargestellten – Fluss Eridanos und ertrank. Deutlich sieht man in diesem Fall, dass der Mensch und sein Körper zentrale Themen der Renaissance waren, denn die künstlerische Umsetzung von Letzterem erscheint hier wichtiger als die verbildlichte Erzählung selbst. Zudem erwecken Nacktheit und Interaktion der Figuren in diesem Relief deutliche homoerotische Assoziationen: Phaethons Genitalien befinden sich genau im Zentrum der Komposition, und die drei Nymphen auf der rechten Seite sind unverblümt mit lesbischen Intimitäten beschäftigt. Obwohl Eridanos die Frauen direkt anblickt, scheint ihn dies allerdings überhaupt nicht zu interessieren. Mit seinen geöffneten Beinen, die den Blick auf die Genitalien freigeben, nimmt er zudem eine sogenannte homoerotische Pose ein.')
,(43, 1, 'Die Rolle der Frau in der Gesellschaft hat sich im Laufe der Geschichte kaum gewandelt. Ihr Alltag beschränkte sich meist auf das Dasein als Mutter und auf das religiöse Leben. Für gewöhnlich war eine Frau zunächst der Vormundschaft ihres Vaters und nach der Heirat der Autorität ihres Ehemanns unterstellt. Die gesellschaftliche Stellung einer Frau, die unabhängig bleiben wollte, war an ihren persönlichen Wohlstand gekoppelt. Nur sehr wenige Frauen hatten jedoch hinreichend eigenes Geld, zudem rief ökonomischer Wohlstand keineswegs immer auch automatisch einen höheren sozialen Status hervor. Warum aber wollten manche Frauen trotz begrenzter sozialer Perspektiven dennoch nicht heiraten? Hierfür gab es zahlreiche Motive. Eines davon war fraglos die Verweigerung einer heterosexuellen Beziehung.', 'Während männliche Märtyrer zumeist direkt durch Enthauptung starben, wurden frühe Märtyrerinnen nahezu durchweg zunächst gefoltert und dabei mit Messern, Schwertern oder Pfeilen durchbohrt. Alle diese Waffen spielen implizit auf die Rolle des männlichen Genitals beim Geschlechtsakt an. Gerade die strikte Ablehnung heterosexuellen Geschlechtsverkehrs war demgegenüber der üblichste Schritt in der Übertretung etablierter Normen traditioneller weiblicher Tugend, die für alle frühen christlichen Märtyrerinnen auf die ein oder andere Art typisch war. In der Regel hätten sie ohne den Verstoß gegen heterosexuelle Prinzipien nie das Martyrium und in dessen Folge die Heiligsprechung erlangt.

Der Fall der heiligen Margarete illustriert indes eindrücklich den Sieg weiblicher sexueller Selbstbestimmung über den Mann. Nach den Heiligenviten des Jakobus de Voragine aus dem 13. Jahrhundert (der sogenannten Legenda Aurea) weigerte sich Margarete zu heiraten, um ihr Leben vollständig Gott zu widmen. Hierauf wurde sie eingekerkert und gefoltert. Im Gefängnis erschien ihr der Teufel in Form eines Drachen – ein Fabelwesen, das in christlichen Legenden die sexuelle Versuchung symbolisiert. Die sich anschließenden Ereignisse überliefert de Voragine in zwei verschiedenen Versionen. Laut der ersten Version wurde Margarete von dem Drachen verschlungen, doch gelang es ihr, aus seinem Bauch zu entkommen, indem sie mit der Hand das Kreuz schlug. Nach der zweiten Variante besiegte sie das Ungeheuer, das angeblich sogar männlichen Aussehens war, indem sie es am Bart packte, mit einem Hammer schlug und schließlich triumphierend ihren Fuß auf sein Genick stellte. In anderen Worten – sie unterwarf es physisch.

In der Sammlung des Bode-Museums gibt es mehrere Darstellungen der heiligen Margarete, die sie meist in Begleitung des friedlich zu ihren Füßen ruhenden Drachen zeigen. So ist beispielsweise der rechte Flügel eines Altars mit einem Bild geschmückt, das mit zwei ungewöhnlichen Details auf den Kampf, den anschließenden Sieg und die letztliche Unterwerfung des Drachen durch die Frau anspielt: Wir sehen Margarete mit der Märtyrerkrone und einen Kreuzstab wie auch eine Leine haltend, mit denen sie den Drachen im Zaum hält und ihn somit daran erinnert, wer seine Herrin ist.')
,(44, 1, 'Die Rolle der Frau in der Gesellschaft hat sich im Laufe der Geschichte kaum gewandelt. Ihr Alltag beschränkte sich meist auf das Dasein als Mutter und auf das religiöse Leben. Für gewöhnlich war eine Frau zunächst der Vormundschaft ihres Vaters und nach der Heirat der Autorität ihres Ehemanns unterstellt. Die gesellschaftliche Stellung einer Frau, die unabhängig bleiben wollte, war an ihren persönlichen Wohlstand gekoppelt. Nur sehr wenige Frauen hatten jedoch hinreichend eigenes Geld, zudem rief ökonomischer Wohlstand keineswegs immer auch automatisch einen höheren sozialen Status hervor. Warum aber wollten manche Frauen trotz begrenzter sozialer Perspektiven dennoch nicht heiraten? Hierfür gab es zahlreiche Motive. Eines davon war fraglos die Verweigerung einer heterosexuellen Beziehung.', 'Hinsichtlich weiblicher Sexualität zeigte die mittelalterliche Gesellschaft deutlich ihre Geringschätzung von Frauen. Weibliches Begehren wurde schlicht nicht ernst genommen, außer es bedrohte männliche Privilegien oder die Vorherrschaft des männlichen Geschlechts. Die Missbilligung weiblicher Homosexualität findet sich etwa in sämtlichen heiligen Schriften des Judentums und Christentums nur an einer einzigen Stelle: im Brief des Paulus an die Römer (»denn bei ihnen haben Frauen den natürlichen Verkehr vertauscht mit dem widernatürlichen«). Obwohl die Bibel der Frage also kaum Aufmerksamkeit widmet, wurde weibliche Homosexualität in den Texten zahlreicher Theologen und Kleriker abgelehnt und von einigen der wichtigsten Kirchenlehrer, etwa Augustinus (354–430) oder Thomas von Aquin (1224/1225–1274), sogar scharf verurteilt.

Verweise auf weibliche Homosexualität sind im Mittelalter ausgesprochen rar, dennoch begann man während dieser Zeit zumindest gegenseitige Zuneigung unter Frauen darzustellen. Ab dem Beginn des 9. Jahrhunderts verbreitete sich in Europa eine neue Darstellungsform für das Thema der Heimsuchung. Laut den Evangelien besuchte Maria kurz vor Jesu Geburt ihre Cousine Elisabeth, die trotz ihres hohen Alters auf wundersame Weise mit Johannes (genannt »der Täufer«) schwanger geworden war. Als sich die beiden Frauen begegneten, bewegte sich Johannes vor Freude im Bauch seiner Mutter, da er die Anwesenheit Christi spürte. Diese traditionelle Szene der Begrüßung wurde nun mit mehr Leidenschaft aufgeladen. Den hochemotionalen Moment illustrierte man, indem sich die beiden Frauen eng umschlangen, ihre Wangen aneinanderschmiegten oder sich sogar auf die Lippen küssten. Letzteres ist auf einem kleinen Buchkasten zu sehen, der vermutlich aus Wallrossknochen gefertigt wurde.')
,(51, 1, 'Wandlungen und Mehrdeutigkeiten im Hinblick auf die Geschlechtszugehörigkeit sind als Themen in der Sammlung des Bode-Museums umfassend präsent. Unabhängig davon, ob Kunstwerke christliche oder mythologische Motive aufweisen, bezeugen sie regelmäßig den seit jeher vorhandenen Drang zur Darstellung sämtlicher Spielarten der Liebe.', 'Es gibt es eine weit zurückreichende Tradition, den Körper der Frau als unrein und sündenbehaftet zu erachten. Wichtige frühchristliche Autoren wie Augustinus (354–430) und Hieronymus (347–420) eröffneten Frauen jedoch einen Ausweg aus diesem vermeintlichen Problem: Durch geistige Standhaftigkeit und Entsagung ihrer Weiblichkeit konnten sie nämlich zumindest eine Art von allegorischem Mannesstatus erlangen. Bereits der Apostel Paulus hatte in seinem Brief an die Galater ausgeführt, dass durch die Taufe nicht nur alle Grenzen der ethnischen, religiösen und sozialen Herkunft, sondern auch des Geschlechts überwunden würden: »Hier ist nicht Jude noch Grieche, hier ist nicht Sklave noch Freier, hier ist nicht Mann noch Frau; denn ihr seid allesamt einer in Christus Jesus.«

Im Laufe der Jahrhunderte interpretierten Gelehrte diese Worte entsprechend den Regeln ihrer jeweiligen patriarchalen Gesellschaften. So überrascht es kaum, dass die christliche Heiligsprechung von Frauen der Transformation und Auslöschung ihrer Körper gleichkam, die ihr Geschlecht gleichsam aufhob und sie gewissermaßen zu »nicht-Frauen« oder »fast-Männern« machte. Selbst wenn diese heiligen Frauen letztlich meist durch Enthauptung starben, wurden sie doch üblicherweise im Moment der auf ihre Sexualität abzielenden Folter dargestellt. Nach den verschiedenen Überlieferungen durchlitt Lucia ihr Martyrium während des 1. Jahrhunderts in der Stadt Syrakus auf Sizilien. Die bekehrte Christin wurde mit einem »Heiden« verlobt, der sie aufgrund ihres Glaubens an die Römer verriet. Zur Strafe wurde sie vergewaltigt, von einem Ochsengespann über den Boden geschleift, in siedendem Öl gebadet, mit einem Dolch in die Kehle gestochen und schließlich enthauptet. Die Legende der heiligen Lucia wurde mit der Zeit ausgebaut, und im 15. Jahrhundert fügte man eine weitere Episode hinzu: Da Lucia aufgrund ihrer wunderschönen Augen ständig von Männern umworben wurde, riss sie diese aus, um ihren Liebreiz zu vernichten und somit ihre Jungfräulichkeit zu bewahren. Seitdem symbolisieren Lucias Augen ihre Lossagung vom weiblichen Geschlecht. Auf dem rechten Flügel des Zamser Altars aus dem 15. Jahrhundert ist Lucia als attraktive, selbstbewusste Frau dargestellt, die in ihrer linken Hand einen Teller hält. Einstmals lagen ihre – heute verschollenen – Augen auf dem Teller. Sie präsentiert sie Gott und weist hierdurch dem Betrachter den Weg zur Heilsfindung.')
,(52, 1, 'Wandlungen und Mehrdeutigkeiten im Hinblick auf die Geschlechtszugehörigkeit sind als Themen in der Sammlung des Bode-Museums umfassend präsent. Unabhängig davon, ob Kunstwerke christliche oder mythologische Motive aufweisen, bezeugen sie regelmäßig den seit jeher vorhandenen Drang zur Darstellung sämtlicher Spielarten der Liebe.', 'Im Mittelalter wurde Jungfräulichkeit nicht nur als ein physischer, sondern auch als ein spiritueller Zustand angesehen. Strebten Frauen ein heiliges Leben an, so war ihr Körper zugleich ein wichtiges Instrument wie auch ein Hindernis. Wenn hingegen Männer Kontrolle über ihren eigenen Körper ausübten und hierdurch auf ihre männliche Geschlechtlichkeit verzichteten, stellten sie die gängigen Vorstellungen von Adel und Rittertum in Frage.

Der heilige Georg war der Prototyp des männlichen christlichen Helden und zählt seit dem Mittelalter zu den am meisten verehrten Heiligen. Vermutlich lebte er während des 3. Jahrhunderts als römischer Soldat. Im 9. Jahrhundert wurde seine Legende um einen fantastischen Kampf gegen einen Drachen und die Rettung einer Prinzessin erweitert. Auch in der Sammlung des Bode-Museums ist er einer der am häufigsten dargestellten Heiligen. Üblicherweise wird er als mittelalterlicher Ritter im Augenblick der Tötung des Drachens gezeigt. Entgegen unserer landläufigen Vorstellungen vom heterosexuellen männlichen Helden (siehe hierzu die 1. Route »In Liebe und Krieg«), bietet Georg dabei ein gutes Beispiel für Mehrdeutigkeiten bei den Geschlechterrollen.

Die Anzahl der Torturen, die Georg während seines Martyriums durchlitt, variiert in den zahlreichen mittelalterlichen Legenden. Die schiere Menge seiner verschiedenen Folterungen ist mit der klassischen Form des weiblichen Martyriums verglichen worden, das üblicherweise aus einer ganzen Reihe von Folterungen des gesamten Körpers bestand, wobei geschlechtsspezifischen Körperteilen, wie etwa den Brüsten, eine besondere Rolle zukam. Männliche Märtyrer hingegen mussten normalerweise deutlich weniger Torturen auf sich nehmen, und sehr häufig beschränkte sich ihr Martyrium sogar allein auf die Enthauptung.

Obwohl die Texte über die Frage der möglichen Jungfräulichkeit des heiligen Georg schweigen, lassen sich in seiner Ikonographie doch zahlreiche Symbole finden, die eigentlich typisch für jungfräuliche Märtyrerinnen sind. So wird Georg etwa durch alle Stationen seines Martyriums hindurch nackt gezeigt oder musste die Foltermethode des Versengens der Brustwarzen über sich ergehen lassen. Auch widerstand er zweimal der Versuchung: Zunächst erschlug er den Drachen (ein christliches Symbol für die sexuelle Versuchung), dann lehnte er es ab, die von ihm gerettete Prinzessin zu heiraten. In einer Skulptur aus dem 16. Jahrhundert im Bode-Museum wurde der Drache vermenschlicht dargestellt, um die Versuchung des Heiligen zu verdeutlichen. Der Drache besitzt nicht nur menschliche Zähne, sondern zudem ein weibliches Genital, das deutlich im Zentrum der Komposition gezeigt wird. Noch dazu liegt das Tier auf dem Rücken, wie bereit für den Geschlechtsakt. Doch auch angesichts dieses mehr als offensichtlichen sexuellen Angebots bleibt Georg unerschütterlich.')
,(53, 1, 'Wandlungen und Mehrdeutigkeiten im Hinblick auf die Geschlechtszugehörigkeit sind als Themen in der Sammlung des Bode-Museums umfassend präsent. Unabhängig davon, ob Kunstwerke christliche oder mythologische Motive aufweisen, bezeugen sie regelmäßig den seit jeher vorhandenen Drang zur Darstellung sämtlicher Spielarten der Liebe.', 'Der Bandbreite zum Thema Liebe war man sich schon in der Antike bewusst, was sich etwa in der Doppelnatur der griechischen Liebesgöttin Aphrodite (lateinisch Venus) ausdrückt.

In den Erzählungen zu den antiken griechischen Göttern, der Mythologie, besaß Aphrodite eine mehrdeutige Persönlichkeit verschiedenen Ursprungs: Als Aphrodite Pandemos, Tochter des Göttervaters Zeus und der Dione, stand sie für die rein körperliche Liebe zur sinnlichen Freude. Die emotionale Liebe – mit Körper und Seele – verkörperte sie als Aphrodite Urania, die dem Meeresschaum entstiegen war, den das abgeschnittene Genital des Gottes Uranos verursacht hatte. Innerhalb dieser Doppelnatur waren beide Seiten der Aphrodite gleichrangig. Um dennoch zwischen den beiden Persönlichkeiten unterscheiden zu können, wurde Aphrodite Urania mit einem Himmelsglobus dargestellt, der ihre eher spirituelle Natur repräsentierte. Einen solchen findet man zum Beispiel zu Füßen der Urania von Giambologna, die ihren nackten Körper gedankenverloren und eher halbherzig mit einem Tuch bedeckt. Dass die Aphrodite Urania ohne jegliches Zutun einer Frau, also eingeschlechtlich, entstanden war, griff mit Karl Heinrich Ulrichs (1825–1895) ein Vorkämpfer der Rechte Homosexueller auf. Im Jahr 1864, also noch bevor der Begriff »homosexuell« zum ersten Mal öffentliche Verwendung fand, entwickelte er für seine Forschungen über das Räthsel der mannmännlichen Liebe den Begriff des »Urning« (auch »Uranier«, weibl. Form: »Urninde«), der den Anspruch gleichwertiger Daseinsberechtigung zum heterosexuellen »Dioning« in sich trug. Ulrichs basierte seine Argumentation dabei unter anderem auf jene zwei Naturen der Liebe, die der griechische Philosoph Platon (428/427–348/347 v. Chr.) in seinem Text Symposium diskutiert hatte.')
,(54, 1, 'Wandlungen und Mehrdeutigkeiten im Hinblick auf die Geschlechtszugehörigkeit sind als Themen in der Sammlung des Bode-Museums umfassend präsent. Unabhängig davon, ob Kunstwerke christliche oder mythologische Motive aufweisen, bezeugen sie regelmäßig den seit jeher vorhandenen Drang zur Darstellung sämtlicher Spielarten der Liebe.', 'Einige christliche Schriften – wie die im 13. Jahrhundert entstandene Sammlung von Heiligengeschichten der Legenda aurea (Goldene Legende) – forderten beide Geschlechter dazu auf, die mystische Vereinigung mit Christus anzustreben und all seine Tugenden und Werte wie Hoffnung, Glaube, Liebe, Tapferkeit und moralische Festigkeit zu leben. Hierbei war es unerheblich, dass die ersten drei als typisch weibliche und die letzten zwei als vorwiegend männliche Eigenschaften galten. Trotz der klar definierten Rollen von Frauen und Männern gab es somit im Mittelalter also auch eine gewisse Durchlässigkeit zwischen den Geschlechtern.

Die Geschichte der heiligen Wilgefortis (je nach Region und Sprache entspricht sie der heiligen Kümmernis, Uncumber, Liberata oder Librada) entstand um 1400 durch die Verschmelzung verschiedener populärer religiöser Legenden mit einer ikonographischen Umdeutung. Erstere handelten von der Verwandlung einer Frau in einen Mann, letztere war in Umkehrung die Umwandlung eines Mannes in eine Frau. Laut der Legende wollte die Prinzessin Wilgefortis jungfräulich bleiben und ein christliches Leben führen. Um ihrer Zwangsheirat mit einem »Heiden“ zu entkommen, bat sie Gott um Hilfe, der ihr einen Bart wachsen ließ. Daraufhin löste ihr Verlobter nicht nur das Eheversprechen auf, Wilgefortis wurde außerdem zum Tode am Kreuz verurteilt – ein Martyrium, das eigentlich Männern vorbehalten war.

Der Impuls zum gegenteiligen ikonographischen Wandel hat seinen Ursprung im heute verlorenen Sacro Volto (heiliges Antlitz), das früher in Lucca aufbewahrt wurde. Es war ein im Mittelalter sehr bekanntes Kultbild und beliebtes Pilgerziel. Die nur selten zur Schau gestellte Holzskulptur stammte vermutlich aus dem 12. Jahrhundert und zeigte den gekreuzigten Christus mit Bart und in ein langes Gewand gekleidet, das mit kostbaren Edelsteinen geschmückt war. Der alten östlichen Bildtradition für Christus am Kreuz folgend, wurde Jesus hier als König, mit geöffneten Augen und eine purpurfarbene Tunika tragend dargestellt. Neben einer langen Haartracht besaß er recht feminine Züge. Kopien dieser Skulptur im nördlichen Europa wurden offenbar als gekreuzigte bärtige Frau missdeutet. Im nieder deutschen Ausdruck »hilge Vartz«, der wörtlichen Übersetzung des italienischen »Sacro Volto«, könnte dabei der Ursprung des Namens Wilgefortis liegen. Mit Brüsten versehen und in ein Frauengewand gekleidet, tritt uns die als Kümmernis benannte Heilige in der im Bode-Museum verwahrten Fassung unmissverständlich als Frau gegenüber. ')
;
SELECT setval('smb.tours_objects_translation_id_seq', 55); -- MAX(id) + 1

UPDATE smb.tours SET directions = '[EG:/data/map/bode_museum_EG.png]
Große Kuppel
Kamecke Halle | WLAN
Basilika | WLAN
Weiter zu Raum 111 | 1. Station: In Liebe und Krieg.
[EG:/data/map/bode_museum_EG.png]
Weiter zu Raum 110 | 2. Station: In Liebe und Krieg.
[EG:/data/map/bode_museum_EG.png]
Raum 111 | 1. Station: In Liebe und Krieg.
Basilika | WLAN
Raum 129
Raum 130
Weiter zu Raum 131 | 3. Station: In Liebe und Krieg. | {2,Männliche Künstler und Homosexualität,2,2. Station: Männliche Künstler und Homosexualität.}
[EG:/data/map/bode_museum_EG.png]
Raum 130
Raum 129 | Treppen oder Aufzug auf der rechten Seite, nach oben nehmen.
Raum 252
Weiter zu Raum 240 | 4. Station: In Liebe und Krieg. | {5,Grenzüberschreitungen,4,4. Station: Grenzüberschreitungen.}
[OG:/data/map/bode_museum_OG.png]
Raum 252
Raum 217
Weiter zu Raum 218 | 5. Station: In Liebe und Krieg.
[OG:/data/map/bode_museum_OG.png]
Raum 219
Raum 216
Raum 214
Weiter zu Raum 213 | 6. Station: In Liebe und Krieg.
[OG:/data/map/bode_museum_OG.png]
Raum 214
Raum 216
Raum 219
Raum 218 | 5. Station: In Liebe und Krieg.
Raum 217
Raum 252
Raum 129 | Treppen oder Aufzug, nach unten nehmen.
Raum 130
Raum 129
Basilika | WLAN
Kamecke Halle | WLAN
Große Kuppel
Weiter zu Ausgang | Danke für Ihren Besuch!'
WHERE id = 1;

UPDATE smb.tours SET directions = '[EG:/data/map/bode_museum_EG.png]
Große Kuppel
Kamecke Halle | WLAN
Basilika | WLAN
Raum 129
Raum 128
Raum 122
Weiter zu Raum 121 | 1. Station: Männliche Künstler und Homosexualität
[OG:/data/map/bode_museum_EG.png]
Weiter zu Raum 072/073 | 2. Station: Männliche Künstler und Homosexualität | {1,In Liebe und Krieg,3,3. Station: In Liebe und Krieg.}
[OG:/data/map/bode_museum_OG.png]
Weiter zu Raum 239 | 3. Station: Männliche Künstler und Homosexualität
[OG:/data/map/bode_museum_OG.png]
Weiter zu Raum 219 | 4. Station: Männliche Künstler und Homosexualität
[OG:/data/map/bode_museum_OG.png]
Weiter zu Raum 261 (TIEPOLO-RAUM) | 4. Station: Männliche Künstler und Homosexualität
[OG:/data/map/bode_museum_OG.png]
Raum 214
Raum 216
Raum 219
Raum 218 | 5. Station: In Liebe und Krieg.
Raum 217
Raum 252
Raum 129 | Treppen oder Aufzug, nach unten nehmen.
Raum 130
Raum 129
Basilika | WLAN
Kamecke Halle | WLAN
Große Kuppel
Weiter zu Ausgang | Danke für Ihren Besuch!'
WHERE id = 2;

UPDATE smb.tours SET directions = '[EG:/data/map/bode_museum_EG.png]
Große Kuppel
Kamecke Halle | WLAN
Basilika | WLAN
Raum 129
Raum 128
Raum 122
Weiter zu Raum 132 | 1. Station: Antike Kunst und aufgeklärtes Sammeln
[OG:/data/map/bode_museum_OG.png]
Weiter zu Kleine Kuppel | 2. Station: Antike Kunst und aufgeklärtes Sammeln
[OG:/data/map/bode_museum_OG.png]
Weiter zu Raum 257 | 3. Station: Antike Kunst und aufgeklärtes Sammeln
[OG:/data/map/bode_museum_OG.png]
Raum 214
Raum 216
Raum 219
Raum 218 | 5. Station: In Liebe und Krieg.
Raum 217
Raum 252
Raum 129 | Treppen oder Aufzug, nach unten nehmen.
Raum 130
Raum 129
Basilika | WLAN
Kamecke Halle | WLAN
Große Kuppel
Weiter zu Ausgang | Danke für Ihren Besuch!'
WHERE id = 3;

UPDATE smb.tours SET directions = '[EG:/data/map/bode_museum_EG.png]
Große Kuppel
Kamecke Halle | WLAN
Basilika | WLAN
Raum 129
Raum 128
Raum 122
Weiter zu Raum 124 | 1. Station: Heldinnen der Tugend
[EG:/data/map/bode_museum_EG.png]
Weiter zu Raum 134 | 2. Station: Heldinnen der Tugend
[EG:/data/map/bode_museum_EG.png]
Weiter zu Raum 107 | 3. Station: Heldinnen der Tugend | {5,Grenzüberschreitungen,1,1. Station: Grenzüberschreitungen.}
[EG:/data/map/bode_museum_EG.png]
Weiter zu Raum 139 | 4. Station: Heldinnen der Tugend
[EG:/data/map/bode_museum_EG.png]
Raum 214
Raum 216
Raum 219
Raum 218 | 5. Station: In Liebe und Krieg.
Raum 217
Raum 252
Raum 129 | Treppen oder Aufzug, nach unten nehmen.
Raum 130
Raum 129
Basilika | WLAN
Kamecke Halle | WLAN
Große Kuppel
Weiter zu Ausgang | Danke für Ihren Besuch!'
WHERE id = 4;

UPDATE smb.tours SET directions = '[EG:/data/map/bode_museum_EG.png]
Große Kuppel
Kamecke Halle | WLAN
Basilika | WLAN
Raum 129
Raum 128
Raum 122
Weiter zu Raum 107 | 1. Station: Grenzüberschreitungen | {4,Heldinnen der Tugend,3,3. Station: Heldinnen der Tugend.}
[OG:/data/map/bode_museum_OG.png]
Weiter zu Raum 215 | 2. Station: Grenzüberschreitungen
[OG:/data/map/bode_museum_OG.png]
Weiter zu Raum 209 | 3. Station: Grenzüberschreitungen
[OG:/data/map/bode_museum_OG.png]
Weiter zu Raum 240 | 4. Station: Grenzüberschreitungen | {1,In Liebe und Krieg,4,4. Station: In Liebe und Krieg.}
[OG:/data/map/bode_museum_OG.png]
Raum 214
Raum 216
Raum 219
Raum 218 | 5. Station: In Liebe und Krieg.
Raum 217
Raum 252
Raum 129 | Treppen oder Aufzug, nach unten nehmen.
Raum 130
Raum 129
Basilika | WLAN
Kamecke Halle | WLAN
Große Kuppel
Weiter zu Ausgang | Danke für Ihren Besuch!'
WHERE id = 5;

INSERT INTO smb.org_unit (name) VALUES
('MVFMusBEuropa'),
('KKAlleSammlungen'),
('KBAlleSammlungen'),
('EMAmArchaologie'),
('MSBNichtdefiniert'),
('SKSSkulpturen'),
('ANTAlleSammlungen'),
('KGMWestberlinerInventarbucherab1980'),
('ZAFotosammlung2'),
('MIMAllgemein2'),
('MEKAllgemein'),
('AKuAlleSammlungen'),
('ISLAlleSammlungen'),
('IFMSammlung'),
('NGAlleSammlungen'),
('VAMAlleSammlungen'),
('AMPAgyptischesMuseum'),
('GGMalerei'),
('MKAlleSammlungen');

INSERT INTO smb.highlights (org_unit_id, object_id) VALUES
(1, 138245),
(1, 144854),
(1, 185580),
(1, 188405),
(1, 192996),
(1, 194398),
(1, 207024),
(1, 209119),
(1, 455905),
(1, 457472),
(1, 461069),
(1, 464652),
(1, 506882),
(1, 525524),
(1, 605994),
(1, 606182),
(1, 606189),
(1, 606325),
(1, 606402),
(2, 606555),
(2, 606563),
(2, 606569),
(2, 606590),
(2, 606592),
(2, 606600),
(2, 606603),
(2, 606612),
(2, 606868),
(2, 606948),
(3, 607025),
(3, 607026),
(3, 607035),
(3, 607132),
(3, 607473),
(3, 610602),
(3, 676679),
(3, 679150),
(3, 681084),
(3, 681513),
(4, 681547),
(4, 686435),
(4, 686542),
(4, 686551),
(4, 686562),
(4, 690892),
(4, 694165),
(4, 694167),
(4, 694201),
(4, 694435),
(4, 697074),
(5, 698150),
(6, 698486),
(7, 698497),
(8, 698508),
(9, 698517),
(10, 698594),
(11, 698904),
(12, 699156);