* Calculate the QRISK3-2017 score for females.
 * @param age
 * @param b_AF
 * @param b_atypicalantipsy
 * @param b_corticosteroids
 * @param b_migraine
 * @param b_ra
 * @param b_renal
 * @param b_semi
 * @param b_sle
 * @param b_treatedhyp
 * @param b_type1
 * @param b_type2
 * @param bmi
 * @param ethrisk
 * @param fh_cvd
 * @param rati
 * @param sbp
 * @param sbps5
 * @param smoke_cat
 * @param surv
 * @param town
 * @returns {number}
 */
const calc = (
    age,
    b_AF,
    b_atypicalantipsy,
    b_corticosteroids,
    b_migraine,
    b_ra,
    b_renal,
    b_semi,
    b_sle,
    b_treatedhyp,
    b_type1,
    b_type2,
    bmi,
    ethrisk,
    fh_cvd,
    rati,
    sbp,
    sbps5,
    smoke_cat,
    surv,
    town
) => {
    // size 16
    const survivor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.988876402378082, 0, 0, 0, 0, 0];

    /* The conditional arrays */
    // size 10
    const Iethrisk = [
        0,
        0,
        0.28040314332995425,
        0.56298994142075398,
        0.29590000851116516,
        0.072785379877982545,
        -0.17072135508857317,
        -0.39371043314874971,
        -0.32632495283530272,
        -0.17127056883241784
    ];

    // size 5
    const Ismoke = [0, 0.13386833786546262, 0.56200858012438537, 0.66749593377502547, 0.84948177644830847];

    /* Applying the fractional polynomial transforms */
    /* (which includes scaling)                      */
    let dage = age;
    dage = dage / 10;
    let age_1 = Math.pow(dage, -2);
    let age_2 = dage;
    let dbmi = bmi;
    dbmi = dbmi / 10;
    let bmi_1 = Math.pow(dbmi, -2);
    let bmi_2 = Math.pow(dbmi, -2) * Math.log(dbmi);

    /* Centring the continuous variables */
    age_1 = age_1 - 0.053274843841791;
    age_2 = age_2 - 4.332503318786621;
    bmi_1 = bmi_1 - 0.154946178197861;
    bmi_2 = bmi_2 - 0.144462317228317;
    rati = rati - 3.47632646560669;
    sbp = sbp - 123.13001251220703;
    sbps5 = sbps5 - 9.002537727355957;
    town = town - 0.392308831214905;

    /* Start of Sum */
    let a = 0;

    /* The conditional sums */

    a += Iethrisk[ethrisk];
    a += Ismoke[smoke_cat];

    /* Sum from continuous values */

    a += age_1 * -8.1388109247726188;
    a += age_2 * 0.79733376689699098;
    a += bmi_1 * 0.29236092275460052;
    a += bmi_2 * -4.1513300213837665;
    a += rati * 0.15338035820802554;
    a += sbp * 0.013131488407103424;
    a += sbps5 * 0.0078894541014586095;
    a += town * 0.077223790588590108;

    /* Sum from boolean values */

    a += b_AF * 1.5923354969269663;
    a += b_atypicalantipsy * 0.25237642070115557;
    a += b_corticosteroids * 0.59520725304601851;
    a += b_migraine * 0.301267260870345;
    a += b_ra * 0.21364803435181942;
    a += b_renal * 0.65194569493845833;
    a += b_semi * 0.12555308058820178;
    a += b_sle * 0.75880938654267693;
    a += b_treatedhyp * 0.50931593683423004;
    a += b_type1 * 1.7267977510537347;
    a += b_type2 * 1.0688773244615468;
    a += fh_cvd * 0.45445319020896213;

    /* Sum from interaction terms */

    a += age_1 * (smoke_cat === 1 ? 1 : 0) * -4.7057161785851891;
    a += age_1 * (smoke_cat === 2 ? 1 : 0) * -2.7430383403573337;
    a += age_1 * (smoke_cat === 3 ? 1 : 0) * -0.86608088829392182;
    a += age_1 * (smoke_cat === 4 ? 1 : 0) * 0.90241562369710648;
    a += age_1 * b_AF * 19.938034889546561;
    a += age_1 * b_corticosteroids * -0.98408045235936281;
    a += age_1 * b_migraine * 1.7634979587872999;
    a += age_1 * b_renal * -3.5874047731694114;
    a += age_1 * b_sle * 19.690303738638292;
    a += age_1 * b_treatedhyp * 11.872809733921812;
    a += age_1 * b_type1 * -1.2444332714320747;
    a += age_1 * b_type2 * 6.8652342000009599;
    a += age_1 * bmi_1 * 23.802623412141742;
    a += age_1 * bmi_2 * -71.184947692087007;
    a += age_1 * fh_cvd * 0.99467807940435127;
    a += age_1 * sbp * 0.034131842338615485;
    a += age_1 * town * -1.0301180802035639;
    a += age_2 * (smoke_cat === 1 ? 1 : 0) * -0.075589244643193026;
    a += age_2 * (smoke_cat === 2 ? 1 : 0) * -0.11951192874867074;
    a += age_2 * (smoke_cat === 3 ? 1 : 0) * -0.10366306397571923;
    a += age_2 * (smoke_cat === 4 ? 1 : 0) * -0.13991853591718389;
    a += age_2 * b_AF * -0.076182651011162505;
    a += age_2 * b_corticosteroids * -0.12005364946742472;
    a += age_2 * b_migraine * -0.065586917898699859;
    a += age_2 * b_renal * -0.22688873086442507;
    a += age_2 * b_sle * 0.077347949679016273;
    a += age_2 * b_treatedhyp * 0.00096857823588174436;
    a += age_2 * b_type1 * -0.28724064624488949;
    a += age_2 * b_type2 * -0.097112252590695489;
    a += age_2 * bmi_1 * 0.52369958933664429;
    a += age_2 * bmi_2 * 0.045744190122323759;
    a += age_2 * fh_cvd * -0.076885051698423038;
    a += age_2 * sbp * -0.0015082501423272358;
    a += age_2 * town * -0.031593414674962329;

    /* Calculate the score itself */
    return 100.0 * (1 - Math.pow(survivor[surv], Math.exp(a)));
};

export { calc };
/* All rights reserved to qrisk3-2017 */
