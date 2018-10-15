'use strict'

const k8s = require('@kubernetes/client-node');
const fs  = require('fs');
const yaml = require('js-yaml');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.Core_v1Api);

let listPods = (namespace) => {
    k8sApi.listNamespacedPod(namespace)
    .then((res)=>{
        console.log(res.body);
        return res.body;
    }).catch((err)=>{
        console.log(err.body);
        return err.body;
    });
};

let createPod = (podFile) => {
    if(fs.existsSync(podFile)) {
        let podContent = fs.readFileSync(podFile, 'utf8');
        let podDef = yaml.safeLoad(podContent);
        k8sApi.createNamespacedPod('default', podDef)
            .then((res)=>{
                console.log(res.body);
                return res.body;
            }).catch((err)=>{
                console.log(err.body);
                return err.body;
            });
    } else {
        let errMsg = "pod file doesn't exist\n";
        console.log(errMsg);
        return errMsg + podFile;
    }
};

module.exports = { listPods, createPod };