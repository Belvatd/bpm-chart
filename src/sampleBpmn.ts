export const sampleBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_QuickBite"
  targetNamespace="http://bpmn.io/schema/bpmn">
  
  <bpmn:collaboration id="Collaboration_QuickBite">
    <bpmn:participant id="Participant_QuickBite" name="Proses Pemesanan &amp; Pelayanan Tenant QuickBite" processRef="Process_QuickBite" />
  </bpmn:collaboration>

  <bpmn:process id="Process_QuickBite" name="Proses Pemesanan QuickBite" isExecutable="true">
    <bpmn:laneSet id="LaneSet_QuickBite">
      <!-- Lane 1: Mahasiswa -->
      <bpmn:lane id="Lane_Mahasiswa" name="Mahasiswa">
        <bpmn:flowNodeRef>Event_Start</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Pesan</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_TerimaNota</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_AmbilMakanan</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_End_Sukses</bpmn:flowNodeRef>
      </bpmn:lane>

      <!-- Lane 2: Kasir -->
      <bpmn:lane id="Lane_Kasir" name="Kasir">
        <bpmn:flowNodeRef>Task_CatatBayar</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_Kembalian</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_HitungKembalian</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_MergeKembalian</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_BeriNota</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_AntarNota</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_KasirPanggilMakanan</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_KasirPanggil</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_TawarRefund</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_End_Batal</bpmn:flowNodeRef>
      </bpmn:lane>

      <!-- Lane 3: Dapur / Koki -->
      <bpmn:lane id="Lane_Dapur" name="Dapur / Koki">
        <bpmn:flowNodeRef>Task_TerimaNotaDapur</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_Stok</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Masak</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_TaruhMejaSaji</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_LaporHabis</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>

    <!-- Node Mahasiswa -->
    <bpmn:startEvent id="Event_Start" name="Datang ke konter QuickBite">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Task_Pesan" name="Melihat menu &amp; menyampaikan pesanan lisan">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_TerimaNota" name="Menerima nota bukti bayar &amp; kembalian (jika ada)">
      <bpmn:incoming>Flow_SerahNota</bpmn:incoming>
      <bpmn:outgoing>Flow_Terima_Antar</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_AmbilMakanan" name="Mengambil makanan di konter">
      <bpmn:incoming>Flow_Kasir_Ambil</bpmn:incoming>
      <bpmn:outgoing>Flow_10</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="Event_End_Sukses" name="Pesanan Selesai">
      <bpmn:incoming>Flow_10</bpmn:incoming>
    </bpmn:endEvent>

    <!-- Node Kasir -->
    <bpmn:userTask id="Task_CatatBayar" name="Tulis nota rangkap 2, hitung total &amp; terima uang tunai">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_Kembalian" name="Butuh kembalian?">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_Kembalian_Ya</bpmn:outgoing>
      <bpmn:outgoing>Flow_Kembalian_Tidak</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="Task_HitungKembalian" name="Hitung uang &amp; siapkan kembalian tunai">
      <bpmn:incoming>Flow_Kembalian_Ya</bpmn:incoming>
      <bpmn:outgoing>Flow_Kembalian_Done</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_MergeKembalian">
      <bpmn:incoming>Flow_Kembalian_Done</bpmn:incoming>
      <bpmn:incoming>Flow_Kembalian_Tidak</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="Task_BeriNota" name="Berikan lembar nota ke-2 &amp; uang kembalian">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_SerahNota</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_AntarNota" name="Tumpuk nota fisik lalu antar ke dapur">
      <bpmn:incoming>Flow_Terima_Antar</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:userTask>
    
    <!-- Kasir Memanggil Mahasiswa Saat Makanan Jadi -->
    <bpmn:userTask id="Task_KasirPanggilMakanan" name="Kasir memanggil nama mahasiswa">
      <bpmn:incoming>Flow_Saji_Kasir</bpmn:incoming>
      <bpmn:outgoing>Flow_Kasir_Ambil</bpmn:outgoing>
    </bpmn:userTask>

    <!-- Node Dapur -->
    <bpmn:userTask id="Task_TerimaNotaDapur" name="Koki terima &amp; baca nota fisik">
      <bpmn:incoming>Flow_6</bpmn:incoming>
      <bpmn:outgoing>Flow_7</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_Stok" name="Bahan baku tersedia?">
      <bpmn:incoming>Flow_7</bpmn:incoming>
      <bpmn:outgoing>Flow_Stok_Ada</bpmn:outgoing>
      <bpmn:outgoing>Flow_Stok_Habis</bpmn:outgoing>
    </bpmn:exclusiveGateway>

    <!-- Jalur A: Stok Ada -->
    <bpmn:userTask id="Task_Masak" name="Memasak pesanan makanan">
      <bpmn:incoming>Flow_Stok_Ada</bpmn:incoming>
      <bpmn:outgoing>Flow_8</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_TaruhMejaSaji" name="Menaruh makanan jadi di meja saji">
      <bpmn:incoming>Flow_8</bpmn:incoming>
      <bpmn:outgoing>Flow_Saji_Kasir</bpmn:outgoing>
    </bpmn:userTask>

    <!-- Jalur B: Stok Habis -->
    <bpmn:userTask id="Task_LaporHabis" name="Hentikan proses &amp; antar balik nota ke kasir">
      <bpmn:incoming>Flow_Stok_Habis</bpmn:incoming>
      <bpmn:outgoing>Flow_11</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_KasirPanggil" name="Kasir memanggil nama mahasiswa">
      <bpmn:incoming>Flow_11</bpmn:incoming>
      <bpmn:outgoing>Flow_12</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_TawarRefund" name="Tawarkan opsi ganti menu atau refund tunai">
      <bpmn:incoming>Flow_12</bpmn:incoming>
      <bpmn:outgoing>Flow_13</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="Event_End_Batal" name="Pesanan Dibatalkan / Direfund">
      <bpmn:incoming>Flow_13</bpmn:incoming>
    </bpmn:endEvent>

    <!-- Sequence Flows -->
    <bpmn:sequenceFlow id="Flow_1" sourceRef="Event_Start" targetRef="Task_Pesan" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Pesan" targetRef="Task_CatatBayar" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_CatatBayar" targetRef="Gateway_Kembalian" />
    <bpmn:sequenceFlow id="Flow_Kembalian_Ya" name="Ya" sourceRef="Gateway_Kembalian" targetRef="Task_HitungKembalian" />
    <bpmn:sequenceFlow id="Flow_Kembalian_Done" sourceRef="Task_HitungKembalian" targetRef="Gateway_MergeKembalian" />
    <bpmn:sequenceFlow id="Flow_Kembalian_Tidak" name="Tidak (Uang Pas)" sourceRef="Gateway_Kembalian" targetRef="Gateway_MergeKembalian" />
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_MergeKembalian" targetRef="Task_BeriNota" />
    <bpmn:sequenceFlow id="Flow_SerahNota" sourceRef="Task_BeriNota" targetRef="Task_TerimaNota" />
    <bpmn:sequenceFlow id="Flow_Terima_Antar" sourceRef="Task_TerimaNota" targetRef="Task_AntarNota" />
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Task_AntarNota" targetRef="Task_TerimaNotaDapur" />
    <bpmn:sequenceFlow id="Flow_7" sourceRef="Task_TerimaNotaDapur" targetRef="Gateway_Stok" />
    <bpmn:sequenceFlow id="Flow_Stok_Ada" name="Stok Ada" sourceRef="Gateway_Stok" targetRef="Task_Masak" />
    <bpmn:sequenceFlow id="Flow_8" sourceRef="Task_Masak" targetRef="Task_TaruhMejaSaji" />
    <bpmn:sequenceFlow id="Flow_Saji_Kasir" sourceRef="Task_TaruhMejaSaji" targetRef="Task_KasirPanggilMakanan" />
    <bpmn:sequenceFlow id="Flow_Kasir_Ambil" sourceRef="Task_KasirPanggilMakanan" targetRef="Task_AmbilMakanan" />
    <bpmn:sequenceFlow id="Flow_10" sourceRef="Task_AmbilMakanan" targetRef="Event_End_Sukses" />
    <bpmn:sequenceFlow id="Flow_Stok_Habis" name="Stok Habis" sourceRef="Gateway_Stok" targetRef="Task_LaporHabis" />
    <bpmn:sequenceFlow id="Flow_11" sourceRef="Task_LaporHabis" targetRef="Task_KasirPanggil" />
    <bpmn:sequenceFlow id="Flow_12" sourceRef="Task_KasirPanggil" targetRef="Task_TawarRefund" />
    <bpmn:sequenceFlow id="Flow_13" sourceRef="Task_TawarRefund" targetRef="Event_End_Batal" />
  </bpmn:process>

  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_QuickBite">
      <!-- Participant Pool -->
      <bpmndi:BPMNShape id="Participant_QuickBite_di" bpmnElement="Participant_QuickBite" isHorizontal="true">
        <dc:Bounds x="40" y="50" width="1880" height="660" />
      </bpmndi:BPMNShape>

      <!-- Lanes -->
      <bpmndi:BPMNShape id="Lane_Mahasiswa_di" bpmnElement="Lane_Mahasiswa" isHorizontal="true">
        <dc:Bounds x="70" y="50" width="1850" height="150" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Kasir_di" bpmnElement="Lane_Kasir" isHorizontal="true">
        <dc:Bounds x="70" y="200" width="1850" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Dapur_di" bpmnElement="Lane_Dapur" isHorizontal="true">
        <dc:Bounds x="70" y="450" width="1850" height="260" />
      </bpmndi:BPMNShape>

      <!-- Mahasiswa Elements -->
      <bpmndi:BPMNShape id="Event_Start_di" bpmnElement="Event_Start">
        <dc:Bounds x="110" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="86" y="145" width="86" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Pesan_di" bpmnElement="Task_Pesan">
        <dc:Bounds x="190" y="85" width="130" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_TerimaNota_di" bpmnElement="Task_TerimaNota">
        <dc:Bounds x="875" y="85" width="140" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_AmbilMakanan_di" bpmnElement="Task_AmbilMakanan">
        <dc:Bounds x="1490" y="85" width="130" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_End_Sukses_di" bpmnElement="Event_End_Sukses">
        <dc:Bounds x="1680" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1657" y="145" width="83" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <!-- Kasir Elements -->
      <bpmndi:BPMNShape id="Task_CatatBayar_di" bpmnElement="Task_CatatBayar">
        <dc:Bounds x="350" y="270" width="140" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Kembalian_di" bpmnElement="Gateway_Kembalian" isMarkerVisible="true">
        <dc:Bounds x="525" y="280" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="507" y="255" width="87" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_HitungKembalian_di" bpmnElement="Task_HitungKembalian">
        <dc:Bounds x="615" y="220" width="130" height="60" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_MergeKembalian_di" bpmnElement="Gateway_MergeKembalian" isMarkerVisible="true">
        <dc:Bounds x="785" y="280" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_BeriNota_di" bpmnElement="Task_BeriNota">
        <dc:Bounds x="875" y="270" width="140" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_AntarNota_di" bpmnElement="Task_AntarNota">
        <dc:Bounds x="1055" y="270" width="130" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_KasirPanggilMakanan_di" bpmnElement="Task_KasirPanggilMakanan">
        <dc:Bounds x="1490" y="230" width="130" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_KasirPanggil_di" bpmnElement="Task_KasirPanggil">
        <dc:Bounds x="1490" y="345" width="130" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_TawarRefund_di" bpmnElement="Task_TawarRefund">
        <dc:Bounds x="1660" y="345" width="130" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_End_Batal_di" bpmnElement="Event_End_Batal">
        <dc:Bounds x="1825" y="360" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1805" y="403" width="80" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <!-- Dapur Elements -->
      <bpmndi:BPMNShape id="Task_TerimaNotaDapur_di" bpmnElement="Task_TerimaNotaDapur">
        <dc:Bounds x="1055" y="520" width="130" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Stok_di" bpmnElement="Gateway_Stok" isMarkerVisible="true">
        <dc:Bounds x="1225" y="530" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1218" y="505" width="67" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Masak_di" bpmnElement="Task_Masak">
        <dc:Bounds x="1320" y="480" width="130" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_TaruhMejaSaji_di" bpmnElement="Task_TaruhMejaSaji">
        <dc:Bounds x="1490" y="480" width="130" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_LaporHabis_di" bpmnElement="Task_LaporHabis">
        <dc:Bounds x="1320" y="605" width="130" height="65" />
      </bpmndi:BPMNShape>

      <!-- Edges -->
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="146" y="120" />
        <di:waypoint x="190" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="320" y="120" />
        <di:waypoint x="335" y="120" />
        <di:waypoint x="335" y="305" />
        <di:waypoint x="350" y="305" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="490" y="305" />
        <di:waypoint x="525" y="305" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Kembalian_Ya_di" bpmnElement="Flow_Kembalian_Ya">
        <di:waypoint x="550" y="280" />
        <di:waypoint x="550" y="250" />
        <di:waypoint x="615" y="250" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="558" y="233" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Kembalian_Done_di" bpmnElement="Flow_Kembalian_Done">
        <di:waypoint x="745" y="250" />
        <di:waypoint x="810" y="250" />
        <di:waypoint x="810" y="280" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Kembalian_Tidak_di" bpmnElement="Flow_Kembalian_Tidak">
        <di:waypoint x="550" y="330" />
        <di:waypoint x="550" y="360" />
        <di:waypoint x="810" y="360" />
        <di:waypoint x="810" y="330" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="635" y="365" width="87" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="835" y="305" />
        <di:waypoint x="875" y="305" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_SerahNota_di" bpmnElement="Flow_SerahNota">
        <di:waypoint x="945" y="270" />
        <di:waypoint x="945" y="155" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Terima_Antar_di" bpmnElement="Flow_Terima_Antar">
        <di:waypoint x="1015" y="120" />
        <di:waypoint x="1035" y="120" />
        <di:waypoint x="1035" y="305" />
        <di:waypoint x="1055" y="305" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="1120" y="340" />
        <di:waypoint x="1120" y="520" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_7_di" bpmnElement="Flow_7">
        <di:waypoint x="1185" y="555" />
        <di:waypoint x="1225" y="555" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Stok_Ada_di" bpmnElement="Flow_Stok_Ada">
        <di:waypoint x="1250" y="530" />
        <di:waypoint x="1250" y="512" />
        <di:waypoint x="1320" y="512" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1255" y="495" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_8_di" bpmnElement="Flow_8">
        <di:waypoint x="1450" y="512" />
        <di:waypoint x="1490" y="512" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Saji_Kasir_di" bpmnElement="Flow_Saji_Kasir">
        <di:waypoint x="1555" y="480" />
        <di:waypoint x="1555" y="295" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Kasir_Ambil_di" bpmnElement="Flow_Kasir_Ambil">
        <di:waypoint x="1555" y="230" />
        <di:waypoint x="1555" y="155" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10_di" bpmnElement="Flow_10">
        <di:waypoint x="1620" y="120" />
        <di:waypoint x="1680" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Stok_Habis_di" bpmnElement="Flow_Stok_Habis">
        <di:waypoint x="1250" y="580" />
        <di:waypoint x="1250" y="638" />
        <di:waypoint x="1320" y="638" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1252" y="643" width="54" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_11_di" bpmnElement="Flow_11">
        <di:waypoint x="1450" y="638" />
        <di:waypoint x="1470" y="638" />
        <di:waypoint x="1470" y="377" />
        <di:waypoint x="1490" y="377" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12_di" bpmnElement="Flow_12">
        <di:waypoint x="1620" y="377" />
        <di:waypoint x="1660" y="377" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_13_di" bpmnElement="Flow_13">
        <di:waypoint x="1790" y="377" />
        <di:waypoint x="1825" y="377" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
