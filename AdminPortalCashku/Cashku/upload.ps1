## Modify the variables below to fit your environment
# If you wish to use Azure, Change $platformChoice to 1 and modify 'Azure Section'
# If you wish to use Amazon Web Services, Change $platformChoice to 2 and Modify 'AWS Section'

## CHOOSE WHICH PLATFORM TO USE ## 1 for Azure / 2 for AWS
$platformChoice = 1

##### Azure Section START #####
$tenantId = "" #Specify a Tenant Id to use. If empty string, will use default tenant when login
$subscriptionId = "" #Specify a Subcription ID to use. If empty string, will use default subscription when login
$resourceGroup = "" #resource group name
$storageAccountName = "" #storage account name
$resourceGroupLocation = "Southeast Asia"
$persistentLogin = "Y" #Option to save login context on local pc, so wont need to relog if rerun. (Y/N)
####################################################
##### ONLY CHANGE IF MODIFIED FROM DEFAULT #####
$indexContainerName = '$web' #static website container (default is $web)
$azCopy = "C:\Program Files (x86)\Microsoft SDKs\Azure\AzCopy\AzCopy.exe" #default installation path of AzCopy

# Azure command: powershell.exe -executionpolicy bypass -file .\upload.ps1
# Install AWS Install-Module -Name AWSPowerShell

##### Azure Section END #####


##### AWS Section START #####

# Access Key, Secret Key and Session Token can be found under Identity and Asset Management of AWS
$accessKey = "" #Access Key for AWS
$secretKey = "" #Secret Key pair to the Access Key
$indexBucketName = "" # Bucket name of where the index.html is stored
$assetBucketName = "" # Bucket name of here the assets are stored
$awsRegion = "ap-southeast-1" # Region to deploy to
$sessionToken = "" # Required only if per session login. If non-session, leave as empty string.

##### AWS Section END #####


########## DONT MODIFY ANYTHING BELOW THIS ###########
$indexcacheControlValue = "no-cache, no-store, must-revalidate"
$indexHeader = @{ "Cache-Control" = "no-cache, no-store, must-revalidate" }
###############################################

# Upload to Azure function
function azureUpload{
    $credArguments = @{}
    if(![string]::IsNullOrEmpty($tenantId)){
        $credArguments['Tenant'] = $tenantId
    }
    if(![string]::IsNullOrEmpty($subscriptionId)){
        $credArguments['Subscription'] = $subscriptionId
    }
    # Asks for login if not logged in and then asks for persistent login
    if ([string]::IsNullOrEmpty((Get-AzContext).Account)){
        Write-Output "Please login to Azure"
        Connect-AzAccount @credArguments -ErrorVariable AzLoginStatus
    }
    if([string]::IsNullOrEmpty($AzLoginStatus))
    {
        if ($persistentLogin.ToLower() -eq "y"){
            Enable-AzContextAutosave > $null
        }
        elseif ($persistentLogin.ToLower() -eq "n"){
            Disable-AzContextAutosave > $null
        }
        else {
            Write-Output "Invalid Response. Defaulting to non-persisent"
            Disable-AzContextAutosave > $null
        }
        Write-Output "Deploying to Azure"
        Get-AzResourceGroup -Name $resourceGroup -ErrorVariable resourceGroupExist -ErrorAction SilentlyContinue > $null

        $storageAccount = Get-AzStorageAccount -ResourceGroupName $resourceGroup -Name $storageAccountName

        $storageAccountKey = (Get-AzStorageAccountKey -ResourceGroupName $resourceGroup -Name $storageAccountName).Value[0]

        # Uploads new blobs from dist folder
        . $azCopy /Source:".\dist\advisonomics-admin" /Dest:"https://"$storageAccountName".blob.core.windows.net/"$indexContainerName"/"  /DestKey:$storageAccountKey /S /Y /SetContentType

        # Sets cache control to no cache
        $ctx = $storageAccount.Context
        $blob = Get-AzStorageBlob -Blob "index.html" -Container $indexContainerName -Context $ctx
        $blob.ICloudBlob.Properties.CacheControl = $indexcacheControlValue
        $blob.ICloudBlob.SetPropertiesAsync() > $null
    }
}

# Upload to AWS function
function awsUpload{
    Write-Output "Deploying to AWS"
    $credArguments = @{'AccessKey' = $accessKey;'SecretKey' = $secretKey;}
    if (![string]::IsNullOrEmpty($sessionToken)){
        $credArguments['SessionToken'] = $sessionToken
    }
    Set-AWSCredential @credArguments
    Set-DefaultAWSRegion -Region $awsRegion
    $indexBucketExist = Get-S3Bucket -BucketName $indexBucketName -ErrorVariable loginException
    if(!(
        ($loginException -eq "The provided token is malformed or otherwise invalid.") -or
        ($loginException -eq "The AWS Access Key Id you provided does not exist in our records.") -or
        ($loginException -eq "The request signature we calculated does not match the signature you provided. Check your key and signing method.")
        ))
    {
        if(!$indexBucketExist)
        {
            New-S3Bucket -BucketName $indexBucketName -PublicReadOnly -Force
        }

        Write-S3BucketWebsite -BucketName $indexBucketName -WebsiteConfiguration_IndexDocumentSuffix index.html
        Write-Output "Standard static website URL: http://$indexBucketName.s3-website-$awsRegion.amazonaws.com"

        Write-S3Object -BucketName $indexBucketName -Folder "./dist/my-app" -KeyPrefix "/" -CannedACLName public-read -Force -Recurse
    }
}

if ($platformChoice -eq 1){
    azureUpload
}
elseif ($platformChoice -eq 2){
    awsUpload
}
else {
    Write-Output "Invalid Platform. Please change it to a valid one"
}
